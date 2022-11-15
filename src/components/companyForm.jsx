import { useCallback } from 'react';

const CompanyForm = ({ company = null, setSelectedCompany, fetchCompanies }) => {
    const handleOnInputChange = useCallback(
        (e, fieldName) => {
            setSelectedCompany((state) => {
                return {
                    ...state,
                    [fieldName]: e.target.value,
                };
            });
        },
        [setSelectedCompany]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            fetch(`/api/v1/dev/companies/${company.id}`, {
                method: 'PUT',
                body: JSON.stringify(company),
            })
                .then((res) => {
                    if (res.status >= 400) {
                        throw new Error('Server Did NOT accept the Edit');
                    }
                    res.json();
                })
                .then(
                    () => {
                        fetchCompanies();
                    },
                    (err) => console.error(err)
                );
        },
        [fetchCompanies, company]
    );

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(company).map((values) => {
                return (
                    <div className='company-preview' key={values[0]}>
                        <label>{`${values[0]}: `} </label>
                        <input value={values[1]} onChange={(e) => handleOnInputChange(e, values[0])} />
                    </div>
                );
            })}
            <input type='submit' value='Submit' />
        </form>
    );
};

export default CompanyForm;
