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
//https://en.wikipedia.org/wiki/IETF_language_tag
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
    th: {
        home: "หน้าแรก",
        hello: "สวัสดีชาวโลก",
        deposit: {
            title: "ฝากเงิน",
            amount: "จำนวนเงิน",
            submit: "ยืนยัน",
            back: "กลับ",
            placeholder: "ใส่จำนวนเงิน",
        },
        withdraw: {
            title: "ถอนเงิน",
            amount: "จำนวนเงิน",
            submit: "ยืนยัน",
            back: "กลับ",
            placeholder: "ใส่จำนวนเงิน",
        },
        buttons: {
            deposit: "ฝากเงิน",
            withdraw: "ถอนเงิน",
        },
        languages: {
            english: "ภาษาอังกฤษ",
            vietnamese: "ภาษาเวียดนาม",
        },
    },
    id: {
        home: "Beranda",
        hello: "Halo Dunia",
        deposit: {
            title: "Setor",
            amount: "Jumlah",
            submit: "Kirim",
            back: "Kembali",
            placeholder: "Masukkan jumlah",
        },
        withdraw: {
            title: "Tarik",
            amount: "Jumlah",
            submit: "Kirim",
            back: "Kembali",
            placeholder: "Masukkan jumlah",
        },
        buttons: {
            deposit: "Setor",
            withdraw: "Tarik",
        },
        languages: {
            english: "Bahasa Inggris",
            vietnamese: "Bahasa Vietnam",
        },
    },
    zh: {
        home: "主页",
        hello: "你好世界",
        deposit: {
            title: "存款",
            amount: "金额",
            submit: "确认",
            back: "返回",
            placeholder: "输入金额",
        },
        withdraw: {
            title: "提款",
            amount: "金额",
            submit: "确认",
            back: "返回",
            placeholder: "输入金额",
        },
        buttons: {
            deposit: "存款",
            withdraw: "提款",
        },
        languages: {
            english: "英语",
            vietnamese: "越南语",
        },
    },
};
