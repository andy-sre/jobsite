import React from 'react';
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import {useAppContext} from "../context/appContext";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
    const {
        isLoading,
        handleChange,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        clearFilters
    } = useAppContext()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (isLoading) return
        handleChange!({name: e.target.name, value: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        clearFilters!()
    }

    return (
        <Wrapper>
            <form action="" className="form">
                <h4>Search Form</h4>
                <div className="form-center">
                    <FormRow
                        type={'text'}
                        name={'search'}
                        value={search}
                        handleChange={handleSearch}
                        />
                    <FormRowSelect
                        name={'searchStatus'}
                        labelText={'Job Status'}
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['All', ...statusOptions]}
                    />
                    <FormRowSelect
                        name={'searchType'}
                        labelText={'Job Type'}
                        value={searchType}
                        handleChange={handleSearch}
                        list={['All', ...jobTypeOptions]}
                    />
                    <FormRowSelect
                        name={'sort'}
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    />
                    <button className="btn btn-block clear-btn" onClick={handleSubmit}>
                        Clear
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;