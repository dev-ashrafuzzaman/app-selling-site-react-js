import { Link } from "react-router-dom";
import useWebUser from "../../../../hooks/web/useWebUser";

const WithdrawType = () => {
    const [isWebUser] = useWebUser()
    return (
        <div className="max-w-screen-sm mx-auto flex justify-center items-center my-10">
            <div className="grid md:grid-cols-2 gap-4">
                {isWebUser.global.withdrawType.map((type, index) => <div
                    key={index}
                    className="card bg-base-100 shadow-xl drop-shadow-lg border-2 border-dashed">
                    <div className="flex justify-center items-center border-b-2 border-dashed h-[200px]">
                        <img className="p-2" width={280} src={type.logo} alt="Withdraw" />
                    </div>
                    <div className="card-body">
                        <h2 className="text-center text-xl font-bold">{type.name}</h2>
                        <p className="text-sm text-justify">{type.details}</p>
                        <div className="card-actions">
                            <Link to={`/user/auth/dashboard/withdraw/${type.name}`} className="btn btn-success text-white w-full my-4">Select</Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default WithdrawType;