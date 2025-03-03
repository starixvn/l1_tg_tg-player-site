"use client";
import { useRouter } from "next/navigation";
import { useResources } from "../../ui/hooks/use-resources";

export default function InvitePage() {
    const router = useRouter();
    const r = useResources();

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">{r.invite.title}</h1>
                <button className="btn btn-outline-secondary" onClick={() => router.push("/")} type="button">
                    {r.invite.back}
                </button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-4">
                        <h5 className="card-title">{r.invite.referralCode}</h5>
                        <div className="input-group">
                            <input type="text" className="form-control" id="referralCode" value={r.invite.yourCode} readOnly />
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => navigator.clipboard.writeText(r.invite.yourCode)}
                            >
                                {r.invite.copy}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5 className="card-title">{r.invite.referralLink}</h5>
                        <div className="input-group">
                            <input type="text" className="form-control" id="referralLink" value={r.invite.yourLink} readOnly />
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => navigator.clipboard.writeText(r.invite.yourLink)}
                            >
                                {r.invite.copy}
                            </button>
                        </div>
                    </div>
                    <div className="alert alert-info">
                        <h6 className="alert-heading">{r.invite.rewards.title}</h6>
                        <p className="mb-0">{r.invite.rewards.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
