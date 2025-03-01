import React, {useEffect, useState} from "react";
import Material from "../model/Material.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {addProject, getALlProjects, loadALlProjectsMaterialRequirements} from "../reducers/projectReducer.ts";
import MaterialRequirement from "../model/materialRequirement.ts";
import Project from "../model/project.ts";
import ProjectDetails from "../model/projectDetails.ts";
import {requestFormReset} from "react-dom";
import {getAllMaterials} from "../reducers/materialReducer.ts";

export function ProjectPage() {


    const dispatch = useDispatch<AppDispatch>();
    const materials: Material[] = useSelector((state: RootState) => state.material);
    const projectsDetails = useSelector((state:RootState) => state.project )
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantProjects , setRelevantProjects] =useState(projectsDetails.projects);
    const[project_no,setProjectNo] = useState('');
    const[project_name,setProjectName] = useState('');
    const[location,setProjectLocation] = useState('');
    const[start_date,setProjectStartDate] = useState('');
    const[completion_date,setCompletionDate] = useState('');
    const[materialRequirementList, setMaterialRequirementList] = useState<MaterialRequirement[]>([]);
    const[relevantProjectMaterialReqirementList, setRelevantProjectMaterialReqirementList] =useState([]);


    useEffect(() => {
        const requirements = materials.map((m)=>(
            {
                material_id:m.material_id,
                required_qty:0,
                issue_qty:0,
                unit:m.unit,
            }
        ))
        setMaterialRequirementList(requirements)
    }, [materials]);

    useEffect(() => {
        dispatch(getAllMaterials())
        dispatch(getALlProjects())
        dispatch(loadALlProjectsMaterialRequirements())
    }, []);

    useEffect(()=>{
        setRelevantProjects(projectsDetails.projects);
    },[projectsDetails.projects]);


    const[errors,setErrors] = useState({
        project_no: '',
        project_name: '',
        location: '',
        start_date: '',
        completion_date: '',
    });

    function validateForm() {
        let isValid = true;
        const newErrors = {
            project_no: '',
            project_name: '',
            location: '',
            start_date: '',
            completion_date: '',
        };

        if (!project_no){
            newErrors.project_no = 'Project No is required';
            isValid = false;
        }

        if (!project_name){
            newErrors.project_name = 'Project Name is required';
            isValid = false;
        }
        if (!location){
            newErrors.location = 'Location is required';
            isValid = false;
        }
        if (!start_date){
            newErrors.start_date = 'Start Date is required';
        }
        if (!completion_date){
            newErrors.completion_date = 'Completion Date is required';
        }

        setErrors(newErrors)
        return isValid;

    }

    function resetForm() {
        setProjectNo('');
        setProjectName('');
        setProjectLocation('');
        setErrors({
            project_no: '',
            project_name: '',
            location: '',
            start_date: '',
            completion_date: '',
        });
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function filterProjects(e) {
        const searchText = e.target.value.toLowerCase();

        if (!searchText ) {
            setRelevantProjects(projectsDetails.projects); // Reset to original if search is empty
            return;
        }
        const filteredProjects = relevantProjects.filter((project) => {
            return(
                project.project_no.toLowerCase().includes(searchText) ||
                project.project_name.toLowerCase().includes(searchText) ||
                project.location.toLowerCase().includes(searchText)
            );
        })
        setRelevantProjects(filteredProjects);

    }

    function handleUpdateProject(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

    }

    function handleAddProject(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) { return}
        console.log(materialRequirementList)

        const projectDetails:ProjectDetails = {
            project_no:project_no,
            project_name:project_name,
            location:location,
            start_date:start_date,
            completion_date:completion_date,
            requirements:materialRequirementList,
        }
        console.log(projectDetails)
        dispatch(addProject(projectDetails));
        resetForm()
        setIsOpen(false)
    }

    function setvaluesForRequirements(e: React.ChangeEvent<HTMLInputElement>,material:Material) {
        setMaterialRequirementList((prevList)=> {
                return prevList.map((requirement) =>
                    requirement.material_id === material.material_id
                        ? {...requirement, required_qty: Number(e.target.value)}
                        : requirement
                );
            }
        )
    }

    function configureUpdateProcess(project) {
        resetForm();
        const requirementList = projectsDetails.requirements.filter((requirement) => requirement.project_no === project.project_no);
        setRelevantProjectMaterialReqirementList(
            requirementList
        )
        console.log(relevantProjectMaterialReqirementList)

        setIsUpdate(true);
        setProjectNo(project.project_no)
        setProjectName(project.project_name)
        setProjectLocation(project.location)
        setProjectStartDate(project.start_date.split('T')[0]);
        setCompletionDate(project.completion_date.split('T')[0])
        setIsOpen(true);
    }


    const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = Number(e.target.value);
        const updatedRequirements = relevantProjectMaterialReqirementList.map((requirement, i) => {
            if (i === index) {
                return { ...requirement,required_qty: newValue };
            }
            return requirement;
        });

        setRelevantProjectMaterialReqirementList(updatedRequirements);
    };

    return (
        <div className="project">
            <div className="page-project-page flex justify-between p-10 bg-slate-100 sticky top-0 ">

                <h1 className='flex flex-row  gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🏗️</span>
                    <span className='text-3xl mt-3'>Manage Projects</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className=' border  outline-none border-blue-300  p-3 rounded-2xl '
                        placeholder='Search Projects'
                        onChange={filterProjects} // Directly call filterMaterials
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                            console.log(materialRequirementList)
                        }}>
                        Add Project
                    </button>
                </div>
            </div>
            <div className={'overflow-y-auto max-h-[calc(10990vh-100px)]'}> {/* Adjusted max-h */}

                {relevantProjects.map((project) => (
                    <div key={project.project_no} className="flex justify-center items-center py-3"> {/* Added py-3 for vertical spacing */}
                        <div className="w-3/4 rounded-lg shadow-md bg-sky-50 p-6 transition-all duration-300 hover:bg-sky-200 hover:shadow-lg cursor-pointer"> {/* Improved styling */}
                            <div className="mb-4"> {/* Added margin for spacing */}
                                <span className="font-semibold text-gray-700">Project No:</span> <span className="text-gray-600">{project.project_no}</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Project Name:</span> <span className="text-gray-600">{project.project_name}</span>
                            </div>
                            <div className="mb-6"> {/* Increased margin */}
                                <span className="font-semibold text-gray-700">Project Location:</span> <span className="text-gray-600">{project.location}</span>
                            </div>
                            <div className="flex justify-center items-center gap-4"> {/* Reduced gap */}
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                                        onClick={() => configureUpdateProcess(project)}
                                >Edit</button>
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Details</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            { isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-row p-4'>

                    <form action="" className='bg-white flex flex-row w-auto gap-x-2 p-4 rounded-xl'>
                        <div className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                            {isUpdate ?
                                (<h1 className='text-xl text-gray-700 mb-4'>*Update Project</h1>)
                                : (<h1 className='text-xl text-gray-700 mb-4'>*Add Project</h1>)
                            }

                            <input className='rounded-xl border p-3' type="text" placeholder="Project NO" required value={project_no}
                                   onChange={(e) => handleInputChange(setProjectNo,'project_no',e.target.value)} />
                            {errors.project_no && <span className="text-red-500">{errors.project_no}</span>}

                            <input className='rounded-xl border p-3' type="text" placeholder="Project Name"
                                   onChange={(e) => handleInputChange(setProjectName,'project_name',e.target.value)} required value={project_name}/>
                            {errors.project_name && <span className="text-red-500">{errors.project_name}</span>}

                            <input className='rounded-xl border p-3' type="text"  placeholder="Location Name"
                                   onChange={(e) => handleInputChange(setProjectLocation,'location',e.target.value)} required value={location}/>
                            {errors.location && <span className="text-red-500">{errors.location}</span>}


                            <input className='rounded-xl border p-3' type="date" placeholder="start date"
                                   onChange={(e) => handleInputChange(setProjectStartDate,'start_date',e.target.value)} required value={start_date}/>
                            {errors.start_date && <span className="text-red-500">{errors.start_date}</span>}

                            <input className='rounded-xl border p-3' type="date" placeholder="completion date"
                                   onChange={(e) => handleInputChange(setCompletionDate,'completion_date',e.target.value)} required value={completion_date}/>
                            <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                                { isUpdate ?
                                    (<button onClick={(e) => {handleUpdateProject(e)}} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'>Update</button>):
                                    (<button onClick={(e) => {handleAddProject(e)}} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'>Save</button>)
                                }
                                <button onClick={() => setIsOpen(false)}
                                        className={'bg-red-500 w-1/2 outline-none rounded-xl p-2 text-white'}>Close
                                </button>
                            </div>
                        </div>
                        <div
                            className='reqpart bg-white flex flex-col pt-2 pl-2 border w-3/4 max-h-[400px] overflow-y-auto'> {/* Added max-h and overflow-y-auto */}
                            {materials.map((material,index) => (
                                <div key={material.material_id}
                                     className='flex flex-row items-center justify-between gap-4 p-2 border-b last:border-b-0'>
                                    <div className='bg-cyan-100 p-2 rounded-md'>
                                        <h1 className='text-sm'>{material.material_id}</h1>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        {!isUpdate && (
                                            <input type="number" min={'0'}
                                                   placeholder={`Required ${material.material_name}`}
                                                   className='border rounded p-1 text-sm'
                                                   onChange={(e) => setvaluesForRequirements(e, material)}/>
                                        )}
                                        {isUpdate && (
                                            <input type='number' min={0}
                                                   placeholder={`Required ${material.material_name}`}
                                                   value={relevantProjectMaterialReqirementList[index] && relevantProjectMaterialReqirementList[index].required_qty }
                                                   className='border rounded p-1 text-sm'
                                                   onChange={(e) => handleRequirementChange(e,index)}/>
                                        )}

                                        {isUpdate && (
                                            <input type="number" min={0}
                                                   value={relevantProjectMaterialReqirementList[index] && relevantProjectMaterialReqirementList[index].issue_qty}
                                                   placeholder={`Supplied ${material.material_name}`}
                                                   className='border rounded p-1 text-sm'/>
                                        )}


                                    </div>
                                    <div className='text-sm'>
                                        <label>{material.unit}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>

                </div>

            }
        </div>
    );
}
