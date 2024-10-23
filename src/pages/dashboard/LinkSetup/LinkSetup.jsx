import { useEffect, useState } from "react";
import useGlobalData from "../../../hooks/useGlobalData";
import ScreenLoad from "../../../components/ScreenLoad";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer } from "react-toastify";
import { handleGlobalUpdate } from "../../../utils/HandleGlobalUpdate";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../utils/Toastify";

const LinkSetup = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isGlobalData, refetch] = useGlobalData();
  const [loading, setLoading] = useState(false);
  const [dailyCommission, setDailyCommission] = useState(
    isGlobalData?.result?.dailyCommission
  );
  const [referBonus, setReferBonus] = useState(
    isGlobalData?.result?.referBonus
  );
  const [withdrawValues, setWithdrawValues] = useState({
    maxAmount: isGlobalData?.result?.withdrawRules?.maxAmount,
    minAmount: isGlobalData?.result?.withdrawRules?.minAmount,
    outAmount: isGlobalData?.result?.withdrawRules?.outAmount,
    minRef: isGlobalData?.result?.withdrawRules?.minRef,
    withTime: isGlobalData?.result?.withdrawRules?.withTime,
  });
  const [dailyNews, setDailyNews] = useState(isGlobalData?.result?.dailyNews);
  const [refNews, setReferNews] = useState(isGlobalData?.result?.refNews);
  const [telegramChannel, setTelegramChannel] = useState(
    isGlobalData?.result?.telegramChannel
  );
  const [telegramGroup, setTelegramGroup] = useState(
    isGlobalData?.result?.telegramGroup
  );
  const [youtube, setYoutube] = useState(isGlobalData?.result?.youtube);
  const [topNews, setTopNews] = useState(isGlobalData?.result?.topNews);

  useEffect(() => {
    setDailyCommission(isGlobalData?.result?.dailyCommission);
    setReferBonus(isGlobalData?.result?.referBonus);
    setWithdrawValues({
      maxAmount: isGlobalData?.result?.withdrawRules?.maxAmount,
      minAmount: isGlobalData?.result?.withdrawRules?.minAmount,
      outAmount: isGlobalData?.result?.withdrawRules?.outAmount,
      minRef: isGlobalData?.result?.withdrawRules?.minRef,
      withTime: isGlobalData?.result?.withdrawRules?.withTime,
    });
    setDailyNews(isGlobalData?.result?.dailyNews);
    setReferNews(isGlobalData?.result?.refNews);
    setTelegramChannel(isGlobalData?.result?.telegramChannel);
    setTelegramGroup(isGlobalData?.result?.telegramGroup);
    setYoutube(isGlobalData?.result?.youtube);
    setTopNews(isGlobalData?.result?.topNews);
    if (isGlobalData) {
      setValue("bkashNumber", isGlobalData?.result?.paymentMathod[0].number);
      setValue("bkashType", isGlobalData?.result?.paymentMathod[0].type);
      setValue("nagadNumber", isGlobalData?.result?.paymentMathod[1].number);
      setValue("nagadType", isGlobalData?.result?.paymentMathod[1].type);

      setValue("rocketNumber", isGlobalData?.result?.paymentMathod[2].number);
      setValue("rocketType", isGlobalData?.result?.paymentMathod[2].type);

      setValue("upayNumber", isGlobalData?.result?.paymentMathod[3].number);
      setValue("upayType", isGlobalData?.result?.paymentMathod[3].type);
    }
  }, [isGlobalData, setValue]);

  // // Commissition Data
  // const comiData = {
  //   dailyCommission: parseInt(dailyCommission),
  // };
  // const handleChangeCom = (event) => {
  //   setDailyCommission(event.target.value);
  // };

  // Refer Bonus Data
  const refBonusData = {
    referBonus: parseInt(referBonus),
  };
  const handleChangeReferBonus = (event) => {
    setReferBonus(event.target.value);
  };

  // // Daily News
  // const dailyNewsData = {
  //   dailyNews,
  // };
  // const handleDailyNews = (event) => {
  //   setDailyNews(event.target.value);
  // };

  // // Refer News
  // const referNewsData = {
  //   refNews,
  // };
  // const handleReferNews = (event) => {
  //   setReferNews(event.target.value);
  // };

  // Channal Link
  const teleChanalData = {
    telegramChannel,
  };
  const handleteleChanal = (event) => {
    setTelegramChannel(event.target.value);
  };

  // Group Link
  const teleGroupData = {
    telegramGroup,
  };
  const handleteleGroup = (event) => {
    setTelegramGroup(event.target.value);
  };

  // Youtube Link
  const youtubeData = {
    youtube,
  };

  const handleyoutube = (event) => {
    setYoutube(event.target.value);
  };

  // Group Link
  const topNewsData = {
    topNews,
  };
  const handleTopNews = (event) => {
    setTopNews(event.target.value);
  };

  const withdrawRuleData = {
    withdrawRules: {
      maxAmount: parseInt(withdrawValues?.maxAmount),
      minAmount: parseInt(withdrawValues?.minAmount),
      outAmount: parseInt(withdrawValues?.outAmount),
      minRef: parseInt(withdrawValues?.minRef),
      withTime: withdrawValues?.withTime,
    },
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const payment = [
        {
          name: "বিকাশ",
          logo: "/public/upload/bkash.png",
          number: formData.bkashNumber,
          type: formData.bkashType,
        },
        {
          name: "নগদ",
          number: formData.nagadNumber,
          logo: "/public/upload/nagad.png",
          type: formData.nagadType,
        },
        {
          name: "রকেট",
          logo: "/public/upload/rocket.png",
          number: formData.rocketNumber,
          type: formData.rocketType,
        },
        {
          name: "উপায় ",
          logo: "/public/upload/upay.png",
          number: formData.upayNumber,
          type: formData.upayType,
        },
      ];
      await axiosSecure
        .patch(`/api/v1/admin/payment/edit/${isGlobalData?.result?._id}`, {
          payment,
        })
        .then((data) => {
          if (data) {
            refetch();
            SuccessToast("Update Success");
            reset();
            setLoading(false);
          } else {
            setLoading(false);
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ScreenLoad></ScreenLoad>}
      <div className="bg-slate-100 max-w-screen-lg mx-auto p-6 my-10 rounded-lg">
        {/* Daily Commission */}
        {/* <div className="w-full">
                    <div className="label">
                        <span className="label-text">Daily Commission</span>
                    </div>
                    <div className="join w-full">
                        <div className="w-full">
                            <div>
                                <input defaultValue={dailyCommission} onChange={handleChangeCom} className="input w-full input-bordered join-item" placeholder="Daily Commission" />
                            </div>
                        </div>
                        <button onClick={() => handleGlobalUpdate(setLoading, comiData, axiosSecure, isGlobalData?.result?._id, refetch)} className="btn join-item btn-success text-white">Update</button>
                    </div>
                </div> */}
        {/* Daily Commission */}
        <div className="w-full">
          <div className="label">
            <span className="label-text">Reseller Commission (%)</span>
          </div>
          <div className="join w-full">
            <div className="w-full">
              <div>
                <input
                  defaultValue={referBonus}
                  onChange={handleChangeReferBonus}
                  className="input w-full input-bordered join-item"
                  placeholder="Daily Commission"
                />
              </div>
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  refBonusData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn join-item btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* Withdraw Rules */}
        <div className="border-2 border-dashed p-2 rounded-lg my-4">
          <p>Withdraw Rules</p>
          <div className="md:flex items-end space-y-2 gap-4">
            <div>
              <div className="label">
                <span className="label-text">Mini amount</span>
              </div>
              <input
                defaultValue={withdrawValues?.minAmount}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    minAmount: e.target.value,
                  })
                }
                className="input w-full input-bordered join-item"
                placeholder="Min Amount"
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Max amount</span>
              </div>
              <input
                defaultValue={withdrawValues?.maxAmount}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    maxAmount: e.target.value,
                  })
                }
                className="input w-full input-bordered join-item"
                placeholder="Max Amount"
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Cash out charge</span>
              </div>
              <input
                defaultValue={withdrawValues?.outAmount}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    outAmount: e.target.value,
                  })
                }
                className="input w-full input-bordered join-item"
                placeholder="Out Charge"
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Mini refer</span>
              </div>
              <input
                defaultValue={withdrawValues?.minRef}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    minRef: e.target.value,
                  })
                }
                className="input w-full input-bordered join-item"
                placeholder="Min Refer"
              />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Withdraw time</span>
              </div>
              <input
                defaultValue={withdrawValues?.withTime}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    withTime: e.target.value,
                  })
                }
                className="input w-full input-bordered join-item"
                placeholder="10am to 5pm"
              />
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  withdrawRuleData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn  btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* Daily News */}
        {/* <div className="w-full">
                    <div className="label">
                        <span className="label-text">Daily News</span>
                    </div>
                    <div className="join w-full">
                        <div className="w-full">
                            <div>
                                <input defaultValue={dailyNews} onChange={handleDailyNews} className="input w-full input-bordered join-item" placeholder="Daily News" />
                            </div>
                        </div>
                        <button onClick={() => handleGlobalUpdate(setLoading, dailyNewsData, axiosSecure, isGlobalData?.result?._id, refetch)} className="btn join-item btn-success text-white">Update</button>
                    </div>
                </div> */}

        {/* refNews News */}
        {/* <div className="w-full">
                    <div className="label">
                        <span className="label-text">Refer News</span>
                    </div>
                    <div className="join w-full">
                        <div className="w-full">
                            <div>
                                <input defaultValue={refNews} onChange={handleReferNews} className="input w-full input-bordered join-item" placeholder="Daily News" />
                            </div>
                        </div>
                        <button onClick={() => handleGlobalUpdate(setLoading, referNewsData, axiosSecure, isGlobalData?.result?._id, refetch)} className="btn join-item btn-success text-white">Update</button>
                    </div>
                </div> */}

        {/* telegramChannel */}
        <div className="w-full">
          <div className="label">
            <span className="label-text">Telegram Channel</span>
          </div>
          <div className="join w-full">
            <div className="w-full">
              <div>
                <input
                  defaultValue={telegramChannel}
                  onChange={handleteleChanal}
                  className="input w-full input-bordered join-item"
                  placeholder="Link"
                />
              </div>
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  teleChanalData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn join-item btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* Whatsapp Link */}
        <div className="w-full">
          <div className="label">
            <span className="label-text">Whatsapp Link</span>
          </div>
          <div className="join w-full">
            <div className="w-full">
              <div>
                <input
                  defaultValue={telegramGroup}
                  onChange={handleteleGroup}
                  className="input w-full input-bordered join-item"
                  placeholder="Link"
                />
              </div>
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  teleGroupData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn join-item btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* Youyube Group */}
        <div className="w-full">
          <div className="label">
            <span className="label-text">Youtube Link</span>
          </div>
          <div className="join w-full">
            <div className="w-full">
              <div>
                <input
                  defaultValue={youtube}
                  onChange={handleyoutube}
                  className="input w-full input-bordered join-item"
                  placeholder="Link"
                />
              </div>
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  youtubeData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn join-item btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* topNews */}
        <div className="w-full">
          <div className="label">
            <span className="label-text">Top News</span>
          </div>
          <div className="md:join w-full">
            <div className="w-full">
              <div>
                <textarea
                  defaultValue={topNews}
                  onChange={handleTopNews}
                  className="textarea textarea-bordered textarea-lg w-full join-item"
                  placeholder="Link"
                />
              </div>
            </div>
            <button
              onClick={() =>
                handleGlobalUpdate(
                  setLoading,
                  topNewsData,
                  axiosSecure,
                  isGlobalData?.result?._id,
                  refetch
                )
              }
              className="btn join-item btn-success text-white">
              Update
            </button>
          </div>
        </div>

        {/* Bkash */}
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Bkash */}
            <div className="flex gap-3 w-full">
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Bkash Number*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("bkashNumber", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Bkash Type*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("bkashType", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
            {/* Nagad */}
            <div className="flex gap-3">
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nagad Number*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("nagadNumber", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nagad Type*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("nagadType", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            {/* Rocket */}
            <div className="flex gap-3">
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Rocket Number*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("rocketNumber", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Rocket Type*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("rocketType", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            {/* Upay */}
            <div className="flex gap-3">
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Upay Number*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("upayNumber", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Upay Type*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here name"
                    {...register("upayType", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button type="submit" className="btn btn-success text-white">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default LinkSetup;
