export type Locale = string;

export type Resources = {
  [key in Locale]: {
    home: string;
    hello: string;
    deposit: {
      title: string;
      amount: string;
      submit: string;
      back: string;
      placeholder: string;
    };
    withdraw: {
      title: string;
      amount: string;
      submit: string;
      back: string;
      placeholder: string;
    };
    buttons: {
      deposit: string;
      withdraw: string;
    };
    languages: {
      english: string;
      vietnamese: string;
    };
  };
};

export const resources: Resources = {
  en: {
    home: "Home",
    hello: "Hello World",
    deposit: {
      title: "Deposit",
      amount: "Amount",
      submit: "Submit",
      back: "Back",
      placeholder: "Enter amount",
    },
    withdraw: {
      title: "Withdraw",
      amount: "Amount",
      submit: "Submit",
      back: "Back",
      placeholder: "Enter amount",
    },
    buttons: {
      deposit: "Deposit",
      withdraw: "Withdraw",
    },
    languages: {
      english: "English",
      vietnamese: "Vietnamese",
    },
  },
  vi: {
    home: "Home",
    hello: "Xin chào Thế giới",
    deposit: {
      title: "Nạp tiền",
      amount: "Số tiền",
      submit: "Xác nhận",
      back: "Quay lại",
      placeholder: "Nhập số tiền",
    },
    withdraw: {
      title: "Rút tiền",
      amount: "Số tiền",
      submit: "Xác nhận",
      back: "Quay lại",
      placeholder: "Nhập số tiền",
    },
    buttons: {
      deposit: "Nạp tiền",
      withdraw: "Rút tiền",
    },
    languages: {
      english: "Tiếng Anh",
      vietnamese: "Tiếng Việt",
    },
  },
};
