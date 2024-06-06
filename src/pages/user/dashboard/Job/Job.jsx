import SectionTitle from "../../../../components/SectionTitle";
import JobsCard from "../../../../components/WebUser/JobsCard";
import useWebUser from "../../../../hooks/web/useWebUser";

const Job = () => {
    const [isWebUser, refetch] = useWebUser()
    return (
        <div className="my-6">
            <SectionTitle heading={'All Jobs'}></SectionTitle>
            <div className="grid md:grid-cols-4 gap-4 md:px-10 px-2">
                {
                    isWebUser?.jobs?.map(job => <JobsCard
                    key={job._id}
                    job={job}
                    refetch={refetch}
                    ></JobsCard>)
                }
            </div>
        </div>
    );
};

export default Job;