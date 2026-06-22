
const providers = [
    require("./provider1"),
    require("./provider2")
];

async function getStreams(id){
    for(const provider of providers){
        try{
            const streams = await provider(id);
            if(streams.length) return streams;
        }catch(e){}
    }
    return [];
}

module.exports = { getStreams };
