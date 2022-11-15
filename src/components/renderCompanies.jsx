import { useCallback } from 'react';

const RenderCompanies = ({ companies = [], setSelectedCompany, selectedCompany = null }) => {
    const handleCompanyClick = useCallback(
        (comp) => {
            setSelectedCompany(comp);
        },
        [setSelectedCompany]
    );

    return (
        <div className='fotter-list'>
            {companies?.map((comp) => {
                return (
                    <div
                        onClick={() => handleCompanyClick(comp)}
                        className={`fotter-list-item ${selectedCompany?.id === comp.id ? 'selected-list-item' : ''}`}
                        key={comp.id}
                    >
                        {comp.name}
                    </div>
                );
            })}
        </div>
    );
};

export default RenderCompanies;
