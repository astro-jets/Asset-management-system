"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
const SearchForm: React.FC = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search/${searchQuery}`);
    };

    return (
        <div className="flex items-center gap-x-2 font-semibold text-white">
            <input type="text" placeholder='Search' className='h-full border-white border-b-[1px] px-1 text-white bg-transparent outline-none placeholder:text-white placeholder:font-normal'
                onChange={(e) => { setSearchQuery(e.target.value) }}
            />
            <button type="submit" onClick={handleSubmit}>
                <BsSearch size={15} color={'#fff'} />
            </button>
        </div>
    );
}

export default SearchForm;