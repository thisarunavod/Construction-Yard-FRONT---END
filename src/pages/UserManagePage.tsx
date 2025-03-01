import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { addUser, deleteUser, getAllUsers, updateUser } from "../reducers/userReducer.ts";
import User from "../model/user.ts"; // Import the User model
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";

export function UsersPage() {
    const userDetails = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantUsers, setRelevantUsers] = useState(userDetails.users);

    useEffect(() => {
        setRelevantUsers(userDetails.users);
    }, [userDetails.users]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const { role } = jwtDecode(accessToken);
            if (role == 'Admin'){ navigate('/')}else{
                dispatch(getAllUsers())
            }
        }else{navigate('/')}
    }, []);

    const [errors, setErrors] = useState({
        userId: '',
        username: '',
        password: '',
        role: ''
    });

    function filterUsers(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = userDetails.users.filter((user:User) => {
            return (
                user.id.toLowerCase().includes(searchText) ||
                user.username.toLowerCase().includes(searchText) ||
                user.role.toLowerCase().includes(searchText)
            );
        });
        setRelevantUsers(filtered);
    }

    function validateForm() {
        let isValid = true;
        const newErrors = {
            userId: '',
            username: '',
            password: '',
            role: ''
        };

        if (!userId) {
            newErrors.userId = 'User ID is required';
            isValid = false;
        }

        if (!username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        if (!role) {
            newErrors.role = 'Role is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function handleAddUser(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const user: User = {
            id: userId,
            username: username,
            password: password,
            role: role,
        };

        dispatch(addUser(user));
        setIsOpen(false); // Close the modal after adding the user
        resetForm(); // Reset the form fields
    }

    function resetForm() {
        setUserId('');
        setUsername('');
        setPassword('');
        setRole('');
        setErrors({
            userId: '',
            username: '',
            password: '',
            role: ''
        });
    }

    function configureUpdateProcess(user: User) {
        resetForm();
        setIsUpdate(true);
        setUserId(user.user_id);
        setUsername(user.user_name);
        setPassword(user.password);
        setRole(user.role);
        setIsOpen(true);
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function handleUpdateUser(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const user: User = {
            id: userId,
            username: username,
            password: password,
            role: role,
        };

        dispatch(updateUser(user));
        setIsOpen(false);
    }

    return (
        <div>
            <div className="page-user-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>👤</span>
                    <span className='text-3xl mt-3'>Manage Users</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search User'
                        onChange={filterUsers}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                        }}>
                        Add User
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>User ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Username</th>
                        <th className='border border-gray-200 px-4 py-2'>Role</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantUsers?.map((user:User, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{user.user_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{user.user_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{user.role}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(user)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this user?")) {
                                                dispatch(deleteUser(user.user_id));
                                            }
                                        }}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col'
                     onClick={() => setIsOpen(false)}>
                    <form action="" className='bg-white flex flex-col w-1/2 gap-y-2 p-4 rounded-xl'
                          onClick={(e) => e.stopPropagation()}>
                        {isUpdate ?
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update User</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add User</h1>)
                        }

                        {/* User ID */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="User ID"
                            required
                            value={userId}
                            onChange={(e) => handleInputChange(setUserId, 'userId', e.target.value)}
                        />
                        {errors.userId && <span className="text-red-500">{errors.userId}</span>}

                        {/* Username */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => handleInputChange(setUsername, 'username', e.target.value)}
                        />
                        {errors.username && <span className="text-red-500">{errors.username}</span>}

                        {/* Password */}
                        <input
                            className='rounded-xl border p-3'
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => handleInputChange(setPassword, 'password', e.target.value)}
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}

                        {/* Role Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={role}
                            onChange={(e) => handleInputChange(setRole, 'role', e.target.value)}
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        {errors.role && <span className="text-red-500">{errors.role}</span>}

                        {/* Save/Update and Close Buttons */}
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddUser(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateUser(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Update</button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className='bg-red-500 w-1/2 outline-none rounded-xl p-2 text-white'
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}