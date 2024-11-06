import './App.css';

function Navigation() {
    function logoClick(e) {
        window.location.href = "/"
    }
    function btnClick(e) {
        window.location.href = "/upload"
    }
    return(
        <div>
            <div className="white-nav">
                <div className="nav-btn" style={{cursor: 'pointer'}} onClick={logoClick}>Faker</div>
                <div className="nav-btn" style={{cursor: 'pointer'}} onClick={btnClick}>이미지 변환하기</div>
            </div>
        </div>
    );
}

export default Navigation;