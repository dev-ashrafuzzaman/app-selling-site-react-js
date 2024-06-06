import { FaMobile } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle";
import useUserWithdraw from "../../../../hooks/web/useUserWithdraw";
import { MdChangeHistory, MdCurrencyExchange, MdDateRange, MdOutbox } from "react-icons/md";
import ScreenLoad from "../../../../components/ScreenLoad";
import { softInfo } from "../../../../utils/info";

const WithdrawHistory = () => {
    const [isUserWithdraw, , isUserWithdrawLoading] = useUserWithdraw();
    return (
        <> {isUserWithdrawLoading && <ScreenLoad></ScreenLoad>}
            <div className="max-w-screen-sm mx-auto mb-10">
                <SectionTitle heading={'History'}></SectionTitle>
                <div className="grid gap-4">
                    {
                        isUserWithdraw?.map((his, index) => <div
                            className="flex justify-center items-center gap-2 w-full"
                            key={index}
                        ><p className="text-xl font-bold">{index + 1}</p>
                            <div className="border-2 border-dashed p-6 rounded-lg shadow-md font-bold flex justify-between items-center w-full">
                                <div className="text-gray-500">
                                    <p className="flex items-center gap-1"><FaMobile></FaMobile>{his.withdrawNumber}</p>
                                    <p className="flex items-center gap-1"><MdDateRange></MdDateRange>{his.date}</p>
                                    <p className="flex items-center gap-1"><MdOutbox></MdOutbox>{his.mathod}</p>
                                </div>
                                <div>
                                    <p>{softInfo.currencyIcon} {his.outAmount}</p>
                                    <p className="flex items-center gap-1"><MdCurrencyExchange></MdCurrencyExchange> {softInfo.currency}</p>
                                    <p className={`flex items-center gap-1 ${his.status == 'Pending' ? 'text-orange-600' : his.status == 'Approved' ? 'text-green-600' : 'text-red-600'}`}><MdChangeHistory></MdChangeHistory>{his.status}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default WithdrawHistory;