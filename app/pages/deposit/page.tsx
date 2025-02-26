"use client";
import { useRouter } from "next/navigation";
import { useResources } from "../../ui/hooks/use-resources";

export default function DepositPage() {
    const router = useRouter();
    const r = useResources();

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">{r.deposit.title}</h1>
                <button className="btn btn-outline-secondary" onClick={() => router.push("/")} type="button">
                    {r.deposit.back}
                </button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">
                                {r.deposit.amount}
                            </label>
                            <input type="number" className="form-control" id="amount" placeholder={r.deposit.placeholder} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {r.deposit.submit}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
