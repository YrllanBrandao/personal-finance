
const cleanOutput = (data) =>{

    if(typeof(data) === "array")
    {
        return data.substring(8, 16);
    }

}

module.exports  = cleanOutput;
