import React, {useState, useEffect, useContext} from "react"
import "../styles/Account.css"
import api from "../api"
import { AuthContext } from "../Contexts/AuthContext"
import SubmissionTable from "../components/SubmissionTable"


function Account() {
    const [isLoading, setIsLoading] = useState(false)
    const [language, setLanguage] = useState("")
    const [content, setContent] = useState("")
    const [selectedMethod, setSelectedMethod] = useState("Linear Classifier")
    const [submissions, setSubmissions] = useState([])
    const { user } = useContext(AuthContext)

    const methods = ["Linear Classifier", "Naive Bayes (Bernoulli)", "Naive Bayes (Multinomial)", "Logistic Classifier", "Random Forest"];
    const methodEndpoints = {
        "Linear Classifier":"linear_svc",
        "Naive Bayes (Bernoulli)":"bernoulli_nb",
        "Naive Bayes (Multinomial)":"multinomial_nb",
        "Logistic Classifier":"logistic_regression",
        "Random Forest": "random_forest",
    }

    useEffect(() => {
        getSubmissions()
    }, [])


    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
    
        try {
          const res = await api.post("/api/sample/predict/", {content: content, endpoint_name: methodEndpoints[selectedMethod]}); 
          console.log(res)
          setLanguage(res.data.language_detected);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          window.location.reload()
        }
      };

      const getSubmissions = async (e) => {
        try {
            const res = await api.get("/api/sample/predict/")
            setSubmissions(res.data)
        } catch (error) {
            console.log(error)
        }
      }


    return (
        <div className="account-page">
            <div className="profile-container">
                <div className="profile-card">
                    <h2>{user ? user.username : ""}</h2>
                    <h4>Submissions: {submissions.length} </h4>
                    <h4>Active Since: {user ? new Date(user.date_joined).toLocaleDateString() : ""}</h4>
                </div>
                <div className="submission-container">
                <form className="text-form" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            value={content}
                            placeholder="Enter some text here..."
                            onChange={(e) => setContent(e.target.value)}
                            id="content"    
                        />
                    </div>
                    <div className="method-selection">
                        {methods.map((method, index) => {         
                            return (        
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {setSelectedMethod(method)}}
                                    className={`${selectedMethod === method ? 'selected' : ''}`}
                                >
                                    {method}
                                </button>
                            )    
                        })
                        }
                    </div>
                    <button className="text-submit" type="submit">
                        Detect Language
                    </button>
                </form>
                </div>
                <div className="history-container">
                    {submissions.length > 0 ?
                        <SubmissionTable 
                            data={submissions}
                        />
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Account