import { useState } from "react";
import axios from 'axios';
export const REMOTE_SERVER = process.env.API_BASE_PATH
export default function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, fileName];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
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
            onChange(prev => {
                return [...prev, ...fileNames];
            });
        });
    }
    return (
        <>
            <div className="flex gap-2">
                <input type="text" className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                    placeholder="Add photos using link ...jpg" onChange={ev => setPhotoLink(ev.target.value)}></input>
                <button onClick={addPhotoByLink} className="bg-gray px-2 rounded-2xl">Add&nbsp;photo</button>
            </div>

            <div className="mt-2 inline-flex justify-content gap-2">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                        <img className="object-cover rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
                ))}
                <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-2 flex items-center justify-content gap-1">
                    <input multiple type="file" className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload</label>
            </div>
        </>
    );
}