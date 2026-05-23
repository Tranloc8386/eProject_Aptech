import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const API = "http://localhost:8000/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const VnpayResult = () => {
  const [searchParams] = useSearchParams();
  const [status,  setStatus]  = useState("loading"); // loading | success | failed
  const [message, setMessage] = useState("");
  const [info,    setInfo]    = useState(null);

  useEffect(() => {
    // Laravel redirect về kèm params status, message, txn_ref...
    const s = searchParams.get("status");
    if (!s) {
      setStatus("failed");
      setMessage("Không có thông tin thanh toán.");
      return;
    }
    if (s === "success") {
      setStatus("success");
      setMessage("Thanh toán thành công!");
      setInfo({
        txn_ref:        searchParams.get("txn_ref"),
        amount:         searchParams.get("amount"),
        bank_code:      searchParams.get("bank_code"),
        transaction_no: searchParams.get("transaction_no"),
        pay_date:       searchParams.get("pay_date"),
      });
    } else {
      setStatus("failed");
      setMessage(searchParams.get("message") || "Thanh toán thất bại hoặc bị huỷ.");
    }
  }, [searchParams]);

  // Loading
  if (status === "loading") return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <Loader size={48} className="mx-auto text-[#8b4513] animate-spin mb-4" />
      <p className="text-[#888]">Đang xác thực thanh toán...</p>
    </div>
  );

  // Success
  if (status === "success") return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <CheckCircle size={72} className="mx-auto text-green-500 mb-4" />
      <h1 className="text-2xl font-bold text-[#2c2c2c] mb-2">Thanh toán thành công!</h1>
      <p className="text-[#888] text-sm mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng đang được xử lý.</p>

      {info && (
        <div className="bg-white rounded-xl p-5 shadow-sm text-left mb-6 space-y-3">
          <h3 className="font-semibold text-[#2c2c2c] mb-3">Chi tiết giao dịch</h3>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Mã đơn hàng</span>
            <span className="font-medium text-[#2c2c2c]">{info.txn_ref}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Số tiền</span>
            <span className="font-semibold text-[#8b4513]">{formatPrice(info.amount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Ngân hàng</span>
            <span className="font-medium text-[#2c2c2c]">{info.bank_code}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Mã giao dịch VNPay</span>
            <span className="font-medium text-[#2c2c2c]">{info.transaction_no}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Thời gian</span>
            <span className="font-medium text-[#2c2c2c]">
              {info.pay_date
                ? `${info.pay_date.slice(6,8)}/${info.pay_date.slice(4,6)}/${info.pay_date.slice(0,4)} ${info.pay_date.slice(8,10)}:${info.pay_date.slice(10,12)}`
                : "---"}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/orders"
          className="bg-[#2c2c2c] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#8b4513] transition-colors"
        >
          Xem đơn hàng
        </Link>
        <Link
          to="/"
          className="border border-[#d4c9ba] text-[#2c2c2c] px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#f0ebe3] transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );

  // Failed
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <XCircle size={72} className="mx-auto text-red-400 mb-4" />
      <h1 className="text-2xl font-bold text-[#2c2c2c] mb-2">Thanh toán thất bại</h1>
      <p className="text-[#888] text-sm mb-6">{message}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/checkout"
          className="bg-[#2c2c2c] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#8b4513] transition-colors"
        >
          Thử lại
        </Link>
        <Link
          to="/"
          className="border border-[#d4c9ba] text-[#2c2c2c] px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#f0ebe3] transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default VnpayResult;
