"use client";
import { useRouter } from "next/navigation";
import { useResources } from "../../ui/hooks/use-resources";

export default function WithdrawPage() {
    const router = useRouter();
    const r = useResources();

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">{r.withdraw.title}</h1>
                <button className="btn btn-outline-secondary" onClick={() => router.push("/")} type="button">
                    {r.withdraw.back}
                </button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">
                                {r.withdraw.amount}
                            </label>
                            <input type="number" className="form-control" id="amount" placeholder={r.withdraw.placeholder} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {r.withdraw.submit}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
