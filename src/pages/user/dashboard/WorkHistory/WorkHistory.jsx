import { FaUserAlt } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle";
import { MdCheck, MdCurrencyExchange, MdDateRange } from "react-icons/md";
import ScreenLoad from "../../../../components/ScreenLoad";
import useWebUser from "../../../../hooks/web/useWebUser";
import { softInfo } from "../../../../utils/info";

const WorkHistory = () => {
    const [isWebUser, , isWebUserLoadding] = useWebUser();
    return (
        <> {isWebUserLoadding && <ScreenLoad></ScreenLoad>}
            <div className="max-w-screen-sm mx-auto mb-10">
                <SectionTitle heading={'History'}></SectionTitle>
                <div className="grid gap-4">
                    {
                        isWebUser.history?.map((his, index) => <div
                            className="flex justify-center items-center gap-2 w-full"
                            key={index}
                        ><p className="text-xl font-bold">{index + 1}</p>
                            <div className="border-2 border-dashed p-6 rounded-lg shadow-md font-bold flex justify-between items-center w-full">
                                <div className="text-gray-500">
                                    <p className={`flex items-center gap-1 ${his.status === true ? 'text-green-600' : 'text-red-600'}`}><MdCheck></MdCheck>{his.type}</p>
                                    <p className="flex items-center gap-1"><MdDateRange></MdDateRange>{his.date}</p>
                                    <p className="flex items-center gap-1"><FaUserAlt></FaUserAlt>{his.by}</p>
                                </div>
                                <div>
                                    <p className={`${his.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{softInfo.currencyIcon} {his.amount}</p>
                                    <p className="flex items-center gap-1"><MdCurrencyExchange></MdCurrencyExchange> {softInfo.currency}</p>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default WorkHistory;