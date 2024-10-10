import React, {useState} from "react"
import "../styles/Home.css"
import api from "../api"

function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [language, setLanguage] = useState("")
    const [content, setContent] = useState("")
    const [selectedMethod, setSelectedMethod] = useState("Linear Classifier")

    const methods = ["Linear Classifier", "Naive Bayes (Bernoulli)", "Naive Bayes (Multinomial)", "Logistic Classifier", "Random Forest"];
    const methodEndpoints = {
        "Linear Classifier":"linear_svc",
        "Naive Bayes (Bernoulli)":"bernoulli_nb",
        "Naive Bayes (Multinomial)":"multinomial_nb",
        "Logistic Classifier":"logistic_regression",
        "Random Forest": "random_forest",
    }

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
        }
      };


    return (
        <div className="homepage">
            <div className="home-banner">
                <h1>
                    Language Identification
                </h1>
                <p>
                    We can identify 17 different languages using Natural Language Processing (NLP) with different classification methods. Try it out below!
                </p>
                <p>
                    Register or log in to save your submissions!
                </p>
            </div>
            <div className="submission-container">
                { language.length > 0 ? 
                    <h4>Language detected: {language}</h4> : 
                    null
                } 
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
            <div className="info-container">
                <p>Detectable Languages: </p>
                <p>English, Malayalam, Hindi, Tamil, Kannada, French, Spanish, Portuguese, Italian, Russian, Sweedish, Dutch, Arabic, Turkish, German, Danish, Greek</p>
            </div>
        </div>
    )
}

export default Home