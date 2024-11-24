// import React from 'react';
// import { Typography, Container, Paper } from '@mui/material';

// export default function MyAccommodations() {
//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Paper sx={{ p: 4, textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>
//           My Accommodations
//         </Typography>
//         <Typography color="text.secondary">
//           Here you can manage your accommodations.
//         </Typography>
//         {/* Add accommodations list component here */}
//       </Paper>
//     </Container>
//   );
// } 

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from 'axios';


export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState<string[]>([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text: string | number) {
        return <h2 className="text-xl mt-4">{text}</h2>
    }

    async function addPhotoByLink(ev: any) {
        ev.preventDefault();
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, fileName];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev: any) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            const { data: fileNames } = res;
            console.log(data);
            setAddedPhotos(prev => {
                return [...prev, ...fileNames];
            });
        });
    }

    console.log(action);

    return (

        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex text-white" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place</Link>
                </div>
            )}
            {action === 'new' && (
                <div className="flex justify-center items-center" >
                    <div className="justify-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
                        <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Accommodation</h3>
                        <form>
                            {inputHeader('Title')}
                            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                                placeholder="Enter a catchy title"></input>
                            {inputHeader('Address')}
                            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                                placeholder="Enter address of your place"></input>
                            {inputHeader('Description')}
                            <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                                placeholder="Enter description of your place"></textarea>
                            {inputHeader('Perks')}
                            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <Perks selected={perks} onChange={setPerks} />
                            </div>
                            {inputHeader('Timings & Guests')}
                            <div className="grid gap-2 sm:grid-cols-3">
                                <div>
                                    <h3 className="mt-2 -mb-5">Check-in time</h3><br />
                                    <input type="time" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                                        className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1" placeholder="6:00AM"></input>
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-5">Check-out time</h3><br />
                                    <input type="time" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                                        className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"></input>
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-5">Max guests</h3><br />
                                    <input type="number" value={maxGuests} onChange={ev => setMaxGuests(Number(ev.target.value))}
                                        className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"></input>
                                </div>
                            </div>
                            {inputHeader('Photos')}
                            <div className="flex gap-2">
                                <input type="text" className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                                    placeholder="Add photos using link ...jpg" onChange={ev => setPhotoLink(ev.target.value)}></input>
                                <button onClick={addPhotoByLink} className="bg-gray px-2 rounded-2xl">Add&nbsp;photo</button>
                            </div>

                            <div className="mt-2 inline-flex justify-content gap-2">
                                {addedPhotos.length > 0 && addedPhotos.map(link => (
                                    <div className="h-32 flex">
                                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                                    </div>
                                ))}
                                <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-2 flex items-center justify-content gap-1">
                                    <input multiple type="file" className="hidden" onChange={uploadPhoto} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    Upload</label>
                            </div>
                            {inputHeader('Additional Information')}
                            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}
                                className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1" placeholder="Enter additional Information"></textarea>
                            <div>
                                <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}