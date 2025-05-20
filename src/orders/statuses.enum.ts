export enum OrderStatusEnum {
  NEW_PENDING = 'newPending', // Đơn mới, chờ xử lý
  CONFIRMED = 'confirmed', // Đã xác nhận (sẵn sàng đóng gói)
  PACKING = 'packing', // Đang đóng gói hàng
  SHIPPED = 'shipped', // Đã bàn giao cho đơn vị vận chuyển
  IN_TRANSIT = 'inTransit', // Đang vận chuyển
  DELIVERED = 'delivered', // Đã giao thành công
  CANCELLED = 'cancelled', // Đã bị hủy
  RETURN_REQUESTED = 'returnRequested', // Yêu cầu trả hàng
  RETURNED = 'returned', // Đã hoàn tất trả hàng
  FAILED_DELIVERY = 'failedDelivery', // Giao hàng thất bại (không liên lạc được, từ chối nhận,...)
}
