<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;       

class CheckoutController extends Controller
{
    private $vnp_TmnCode    = "QM1JQ9W5";
    private $vnp_HashSecret = "ED3QSVG97Z3B3QGSQ49DBQU4Z0CF6LT0";
    private $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private $vnp_Returnurl;

    private $react_url = "http://localhost:3000";

    public function __construct()
    {
        $this->vnp_Returnurl = url('/api/vnpay-return');
    }

    // Tạo URL thanh toán VNPay
    public function createPayment(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_TxnRef    = time() . rand(100, 999);
        $vnp_Amount    = $request->amount;
        $vnp_Locale    = $request->language ?? 'vn';
        $vnp_BankCode  = $request->bankCode ?? '';
        $vnp_IpAddr    = $request->ip();
        $vnp_OrderInfo = 'Thanh toan don hang: ' . $vnp_TxnRef;

        $startTime = date('YmdHis');
        $expire    = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));

        $inputData = [
            "vnp_Version"    => "2.1.0",
            "vnp_TmnCode"    => $this->vnp_TmnCode,
            "vnp_Amount"     => $vnp_Amount * 100,
            "vnp_Command"    => "pay",
            "vnp_CreateDate" => $startTime,
            "vnp_CurrCode"   => "VND",
            "vnp_IpAddr"     => $vnp_IpAddr,
            "vnp_Locale"     => $vnp_Locale,
            "vnp_OrderInfo"  => $vnp_OrderInfo,
            "vnp_OrderType"  => "other",
            "vnp_ReturnUrl"  => $this->vnp_Returnurl,
            "vnp_TxnRef"     => $vnp_TxnRef,
            "vnp_ExpireDate" => $expire,
        ];

        if (!empty($vnp_BankCode)) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query    = "";
        $i        = 0;
        $hashdata = "";

        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . $key . "=" . $value;
            } else {
                $hashdata .= $key . "=" . $value;
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnpSecureHash = hash_hmac('sha512', $hashdata, $this->vnp_HashSecret);
        $paymentUrl    = $this->vnp_Url . "?" . $query . 'vnp_SecureHash=' . $vnpSecureHash;

        \Log::info('VNPAY Debug', [
            'hashdata'   => $hashdata,
            'hash'       => $vnpSecureHash,
            'paymentUrl' => $paymentUrl,
        ]);

        return response()->json([
            'status'      => 'success',
            'payment_url' => $paymentUrl,
            'txn_ref'     => $vnp_TxnRef,
        ]);
    }

    // VNPay callback sau khi thanh toán
    public function vnpayReturn(Request $request)
    {
        $vnp_SecureHash = $request->vnp_SecureHash;
        $inputData = [];

        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        unset($inputData['vnp_SecureHash']);
        ksort($inputData);

        $i        = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $this->vnp_HashSecret);

        if ($secureHash !== $vnp_SecureHash) {
            return redirect($this->react_url . '/vnpay-result?' . http_build_query([
                'status'  => 'error',
                'message' => 'Chữ ký không hợp lệ',
            ]));
        }

        if ($request->vnp_ResponseCode == '00') {
            return redirect($this->react_url . '/vnpay-result?' . http_build_query([
                'status'         => 'success',
                'message'        => 'Thanh toán thành công',
                'txn_ref'        => $request->vnp_TxnRef,
                'amount'         => $request->vnp_Amount / 100,
                'bank_code'      => $request->vnp_BankCode,
                'transaction_no' => $request->vnp_TransactionNo,
                'pay_date'       => $request->vnp_PayDate,
            ]));
        }

        return redirect($this->react_url . '/vnpay-result?' . http_build_query([
            'status'  => 'failed',
            'message' => 'Thanh toán thất bại hoặc bị huỷ',
        ]));
    }
}
