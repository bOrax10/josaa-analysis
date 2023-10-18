const Home = () => {
    return (
        <div className="home mx-5 mt-5 px-5 sm:mt-6 sm:px-6 md:mt-8 lg:mt-10 lg:px-8 xl:mt-14">
            <h1 className="display-5 fw-bold sm:text-center lg:text-left">Cutoff Analysis</h1>
            <p className="display-7 sm:text-center lg:text-left">A tool that helps you find your optimal choices for JoSAA counselling.</p>

            <div class="container-lg mt-5 d-flex flex-lg-row flex-sm-column">
                <div className="container d-flex mt-lg-0 mt-sm-4">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-light">View All Branches</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>View all the branches and courses belonging to the branches available for JoSAA counselling.</h6>
                            <hr className="custom-hr" />
                            <a href="#" className="card-link text-decoration-none">Get Started →</a>
                        </div>
                    </div>
                </div>

                <div className="container d-flex mt-lg-0 mt-sm-4">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-light">View All Institutes</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>View all the institutes participating in JoSAA counselling and the courses offered by them.</h6>
                            <hr className="custom-hr" />
                            <a href="#" className="card-link text-decoration-none">Get Started →</a>
                        </div>  
                    </div>
                </div>

                <div className="container d-flex mt-lg-0 mt-sm-4">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-light">View Branch-wise Cut-offs</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>View the cut-off data with the selected branches and further narrow down with your choice of institutes. </h6>
                            <hr className="custom-hr" />
                            <a href="#" className="card-link text-decoration-none">Get Started →</a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="container-lg mt-4 d-flex flex-lg-row flex-sm-column">
                <div className="container d-flex mt-lg-0 mt-sm-4">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-light">View Institute-wise Cut-offs</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>View the cut-off data with the selected institutes and further narrow down with your choice of programs. </h6>
                            <div className="">
                                <hr className="custom-hr" />
                                <a href="#" className="card-link text-decoration-none">Get Started →</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container d-flex mt-lg-0 mt-sm-4">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-light">Analyse Branch-wise Cut-off Trends</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>Branch trends highlight the trends of courses in a particular branch over the years. This helps understand the popularity and perception of a branch among engineering aspirants, and thus helps understand the demand for a particular branch during the counselling process.</h6>
                            <div className="mt-auto">
                                <hr className="custom-hr" />
                                <a href="#" className="card-link text-decoration-none">Get Started →</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container d-flex">
                    <div className="card bg-dark mt-lg-0 mt-sm-4">
                        <div className="card-body">
                            <h5 className="card-title text-light">Analyse Institute-wise Cut-off Trends</h5>
                            <h6 className="card-subtitle mb-2" style={{ color: '#929690' }}>Institute trends highlight the trends of various programs offered by a particular institute over the years. This helps understand the popularity and perception of programs offered by the institute, and thus helps understand the demand for a particular program in the institute during the counselling process.</h6>
                            <div className="mt-auto">
                                <hr className="custom-hr" />
                                <a href="#" className="card-link text-decoration-none">Get Started →</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="container-lg my-4 ms-4 me-5 ">
                <div class="card bg-dark">
                    <div class="card-body">
                        <h5 class="card-title text-light">Analyse Round-wise Cut-off Trends</h5>
                        <h6 class="card-subtitle mb-2" style={{ color: '#929690' }}>Round trends highlight the general trend of closing ranks throughout the rounds of the counselling process. This helps understand the likely range of changes to the closing ranks throughout the counselling process.</h6>
                        <hr class="custom-hr" />
                        <a href="#" class="card-link text-decoration-none">Get Started →</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
