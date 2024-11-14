import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type paramProps = {
    params: Params
}
const SingleAsset = async ({ params }: paramProps) => {
    const filter = params.filter;
    const q = params.query;
    const query = `Search for ${q} in ${filter}`
    return (
        <h1>{query}</h1>
    );
}