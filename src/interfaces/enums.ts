export enum TRANSACTION_TYPE {
  ACCUMULATE = 'accumulate',
  EXCHANGE = 'exchange',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum CartType {
  PRODUCT = 'product',
  VOUCHER = 'voucher',
}

export enum STATE {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
}

export enum ACTION {
  POINT = 'point',
  LOAD_MORE = 'loadMore',
  TYPE = 'type',
  CATEGORY = 'category',
  NONE = '',
  TIME = 'time',
  SEARCH = 'search',
  SERVICE = 'service',
}

export enum PAGE_ERROR {
  PAGE_404 = 'Trang bạn tìm không tồn tại!',
  ONLY_MOBILE = 'Web chỉ hỗ trợ trên nền tảng Mobile!',
  NONE_PRODUCT_DETAIL = 'Sản phẩm chưa có thông tin!',
  NONE_VOUCHER_DETAIL = 'Voucher chưa có thông tin!',
  REQUIRE_LOGIN = 'Bạn không có quyền xem trang này!',
  NO_PRODUCTS_IN_CART = 'Bạn chưa chọn sản phẩm nào trong giỏ hàng',
  DEFAULT = 'Đã có lỗi xảy ra, vui lòng thử lại sau',
}