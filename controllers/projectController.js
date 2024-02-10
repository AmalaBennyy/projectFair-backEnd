//improt model
const projects = require('../Model/projectSchema');
const users = require('../Model/userSchema');

// exports.addproject =async(req,res)=>{
//     console.log('inside project add controller');
//     const userId = req.payload
//     console.log(userId);
//     const image =req.file.filename
   
   
//     const{title,language,github,website,overview}=req.body
//     console.log(`${title},${language},${github},${website},${overview},${image},${userId}}`);


//     try{
//         const ExistingProject = await projects.findOne({github})

//         if(ExistingProject){
//             res.status(406).json(`Project already exist..please upload a new project`)
//         }else{
//             const newProject = new projects({
//                 title,language,github,website,overview,image,userId

//             })
//             await newProject.save()
//             res.status(200).json(newProject)
//         }

//     }catch(err){
//         res.status(401).json(`Request failed due to ${err}`)
//     }

//     res.status(200).json('add project request recieved')
// }
exports.addproject = async (req, res) => {
    console.log('inside project add controller');
    const userId = req.payload;
    console.log(userId);
    const image = req.file.filename;

    const { title, language, github, website, overview } = req.body;
    console.log(`${title},${language},${github},${website},${overview},${image},${userId}}`);

    try {
        const existingProject = await projects.findOne({ github });

        if (existingProject) {
            res.status(406).json(`Project already exists. Please upload a new project.`);
        } else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                image,
                userId
            });
            await newProject.save();
            res.status(200).json(newProject);
        }
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
    // Move this line outside of the try-catch block
    // res.status(200).json('Add project request received');
};


//home project
exports.gethomeproject=async(req,res)=>{
    try{
        const homeproject=await projects.find().limit(3)
        res.status(200).json(homeproject);

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`);

    }


}

//allproject
exports.getallproject=async(req,res)=>{
    const search=req.query.search
    console.log(search);
    const query={
        language:{
            //regular expression , options -it removes case sensitivity
        $regex:search,$options:'i'


        }
        
    }
    
    try{
        const allproject=await projects.find(query)
        res.status(200).json(allproject)

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//userproject

exports.getuserproject=async(req,res)=>{
    const userId=req.payload
    try{
        const userproject=await projects.find({userId})
        res.status(200).json(userproject)

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//edit project

exports.editProject=async(req,res)=>{

    const{id}=req.params
    const userId=req.payload
    const{title,language,github,website,overview,image}=req.body
    const uploadProjectImage=req.file?req.file.filename:image

try{
    const updateProject=await projects.findByIdAndUpdate(
        {_id:id},{title,language,github,website,overview,image:uploadProjectImage,userId},{new:true} )
        await updateProject.save()
        res.status(200).json(updateProject)
        
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)


    }
}

//delete project

exports.deleteProject=async(req,res)=>{
    const {id}=req.params
    try{
        const removeproject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeproject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

