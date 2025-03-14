import React, { useEffect, useState } from 'react';
import axios from 'axios';
import adminBackground from '../../assets/adminn.jpg'; // Ensure this path is correct

const SymptomRow = ({ symptom, onEditClick, onDelete, isEditing, editingSymptom, onInputChange, onSave, onCancel }) => (
    <tr key={symptom._id} className="hover:bg-gray-100">
        {isEditing ? (
            <>
                <td className="p-2">
                    <input
                        name="ageGroup"
                        value={editingSymptom.ageGroup}
                        onChange={onInputChange}
                        className="border border-gray-400 rounded p-2 focus:outline-none focus:border-teal-500"
                    />
                </td>
                <td className="p-2">
                    <input
                        name="height"
                        value={editingSymptom.height}
                        onChange={onInputChange}
                        className="border border-gray-400 rounded p-2 focus:outline-none focus:border-teal-500"
                    />
                </td>
                <td className="p-2">
                    <input
                        name="weight"
                        value={editingSymptom.weight}
                        onChange={onInputChange}
                        className="border border-gray-400 rounded p-2 focus:outline-none focus:border-teal-500"
                    />
                </td>
                <td className="p-2">
                    <button onClick={onSave} className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300">Save</button>
                    <button onClick={onCancel} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ml-2">Cancel</button>
                </td>
            </>
        ) : (
            <>
                <td className="py-4 px-6 border-b">{symptom.ageGroup}</td>
                <td className="py-4 px-6 border-b">{symptom.height}</td>
                <td className="py-4 px-6 border-b">{symptom.weight}</td>
                <td className="py-4 px-6 border-b">
                    <button onClick={() => onEditClick(symptom)} className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300">Edit</button>
                    <button onClick={() => onDelete(symptom._id)} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ml-2">Delete</button>
                </td>
            </>
        )}
    </tr>
);

const AdminPage = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [editingSymptom, setEditingSymptom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const fetchSymptoms = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/symptoms');
            setSymptoms(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching symptoms. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id) => {
        const updatedData = { ...editingSymptom };
        setLoading(true);
        try {
            await axios.put(`http://localhost:3001/api/symptoms/${id}`, updatedData);
            fetchSymptoms();
            setEditingSymptom(null);
        } catch (error) {
            setError('Error updating symptom. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3001/api/symptoms/${id}`);
            fetchSymptoms();
        } catch (error) {
            setError('Error deleting symptom. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (symptom) => {
        setEditingSymptom(symptom);
    };

    const handleInputChange = (e) => {
        setEditingSymptom({
            ...editingSymptom,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveUpdate = () => {
        if (editingSymptom) {
            handleUpdate(editingSymptom._id);
        }
    };

    const handleCancel = () => {
        setEditingSymptom(null);
    };

    return (
        <div className="min-h-screen flex w-full">
            <div 
                className="flex-1 bg-cover bg-center" 
                style={{ 
                    backgroundImage: `url(${adminBackground})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    width: '80vw', // Full width
                    height: '100vh', // Full height
                    margin: 0, // Remove any default margin
                    padding: 0, // Remove any default padding
                }}
            />
            <div className="flex-1 flex flex-col bg-white h-full justify-start items-center p-6">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-teal-600">Content Management</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Manage Symptoms</h2>
                </div>
                {loading && <p className="text-teal-600">Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-4xl">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-teal-600 text-white">
                            <tr>
                                <th className="py-4 px-6 border-b">Age Group</th>
                                <th className="py-4 px-6 border-b">Height</th>
                                <th className="py-4 px-6 border-b">Weight</th>
                                <th className="py-4 px-6 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {symptoms.map(symptom => (
                                <SymptomRow 
                                    key={symptom._id}
                                    symptom={symptom}
                                    onEditClick={handleEditClick}
                                    onDelete={handleDelete}
                                    isEditing={editingSymptom && editingSymptom._id === symptom._id}
                                    editingSymptom={editingSymptom}
                                    onInputChange={handleInputChange}
                                    onSave={handleSaveUpdate}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
