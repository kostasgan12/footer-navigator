import './App.css';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';

const CompanyForm = lazy(() => import('./components/companyForm'));
const RenderCompanies = lazy(() => import('./components/renderCompanies'));

function App() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const fetchCompanies = useCallback(async () => {
        return await fetch('/api/v1/dev/companies', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setCompanies(result.content);
            });
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    return (
        <Suspense fallback='Please wait, while app is loading'>
            <div className='App'>
                <header className='App-header'>INOP ASSESSMENT</header>
                <body className='App-body'>
                    {selectedCompany && (
                        <CompanyForm
                            company={selectedCompany}
                            setSelectedCompany={setSelectedCompany}
                            fetchCompanies={fetchCompanies}
                        />
                    )}
                </body>
                <footer className='App-footer'>
                    {!!companies?.length && (
                        <RenderCompanies
                            companies={companies}
                            setSelectedCompany={setSelectedCompany}
                            selectedCompany={selectedCompany}
                        />
                    )}
                </footer>
            </div>
        </Suspense>
    );
}

export default App;
