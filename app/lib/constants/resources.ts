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
        invite: {
            title: string;
            back: string;
            referralCode: string;
            referralLink: string;
            copy: string;
            yourCode: string;
            yourLink: string;
            rewards: {
                title: string;
                description: string;
            };
        };
        buttons: {
            deposit: string;
            withdraw: string;
            invite: string;
        };
        languages: {
            english: string;
            vietnamese: string;
            thai: string;
            indonesian: string;
            chinese: string;
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
        invite: {
            title: "Invite Friends",
            back: "Back",
            referralCode: "Your Referral Code",
            referralLink: "Your Referral Link",
            copy: "Copy",
            yourCode: "ABC123",
            yourLink: "https://example.com/ref/ABC123",
            rewards: {
                title: "Referral Rewards",
                description:
                    "Invite your friends and earn rewards! For each friend who joins and makes their first deposit, you'll receive a bonus.",
            },
        },
        buttons: {
            deposit: "Deposit",
            withdraw: "Withdraw",
            invite: "Invite",
        },
        languages: {
            english: "English",
            vietnamese: "Vietnamese",
            thai: "Thai",
            indonesian: "Indonesian",
            chinese: "Chinese",
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
        invite: {
            title: "Mời bạn",
            back: "Quay lại",
            referralCode: "Mã giới thiệu của bạn",
            referralLink: "Liên kết giới thiệu của bạn",
            copy: "Sao chép",
            yourCode: "ABC123",
            yourLink: "https://example.com/ref/ABC123",
            rewards: {
                title: "Quà tặng giới thiệu",
                description: "Mời bạn bạn và kiếm tiền! Với mỗi bạn bạn tham gia và làm cọc đầu tiên, bạn sẽ nhận được phần thưởng.",
            },
        },
        buttons: {
            deposit: "Nạp tiền",
            withdraw: "Rút tiền",
            invite: "Mời bạn",
        },
        languages: {
            english: "Tiếng Anh",
            vietnamese: "Tiếng Việt",
            thai: "Thai",
            indonesian: "Indonesian",
            chinese: "Chinese",
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
        invite: {
            title: "เชิญเพื่อน",
            back: "กลับ",
            referralCode: "รหัสอ้างอิงของคุณ",
            referralLink: "ลิงค์อ้างอิงของคุณ",
            copy: "คัดลอก",
            yourCode: "ABC123",
            yourLink: "https://example.com/ref/ABC123",
            rewards: {
                title: "รางวัลอ้างอิง",
                description: "เชิญเพื่อนและทำเงิน! สำหรับทุกเพื่อนที่เข้าร่วมและทำเงินแรกของพวกเขา คุณจะได้รับโบนัส",
            },
        },
        buttons: {
            deposit: "ฝากเงิน",
            withdraw: "ถอนเงิน",
            invite: "เชิญเพื่อน",
        },
        languages: {
            english: "ภาษาอังกฤษ",
            vietnamese: "ภาษาเวียดนาม",
            thai: "Thai",
            indonesian: "Indonesian",
            chinese: "Chinese",
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
        invite: {
            title: "Undang Teman",
            back: "Kembali",
            referralCode: "Kode Referral Anda",
            referralLink: "Tautan Referral Anda",
            copy: "Salin",
            yourCode: "ABC123",
            yourLink: "https://example.com/ref/ABC123",
            rewards: {
                title: "Hadiah Referral",
                description:
                    "Undang teman dan dapatkan hadiah! Untuk setiap teman yang bergabung dan melakukan deposit pertama, Anda akan menerima bonus.",
            },
        },
        buttons: {
            deposit: "Setor",
            withdraw: "Tarik",
            invite: "Undang",
        },
        languages: {
            english: "Bahasa Inggris",
            vietnamese: "Bahasa Vietnam",
            thai: "Thai",
            indonesian: "Indonesian",
            chinese: "Chinese",
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
        invite: {
            title: "邀请朋友",
            back: "返回",
            referralCode: "你的推荐码",
            referralLink: "你的推荐链接",
            copy: "复制",
            yourCode: "ABC123",
            yourLink: "https://example.com/ref/ABC123",
            rewards: {
                title: "推荐奖励",
                description: "邀请你的朋友并赚取奖励！每个加入并首次存款的朋友，你将获得奖励。",
            },
        },
        buttons: {
            deposit: "存款",
            withdraw: "提款",
            invite: "邀请",
        },
        languages: {
            english: "英语",
            vietnamese: "越南语",
            thai: "Thai",
            indonesian: "Indonesian",
            chinese: "Chinese",
        },
    },
};
