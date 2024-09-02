import { searchService } from "@/app/actions/action";
import ServicesList from "@/app/components/services/ServicesList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type paramProps = {
    params: Params
}

type servicesProps = {
    _id: string;
    name: string;
    price: string;
    list: string[];
}[];

const SearchResult = async ({ params }: paramProps) => {
    const id: string = params.id;
    const results: servicesProps = await searchService(id);

    return (
        <ServicesList services={results} />
    );
}

export default SearchResult;