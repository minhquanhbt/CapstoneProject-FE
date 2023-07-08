import React,{useState} from 'react'
import { Avatar, Button } from 'antd'
import './style.scss'
const ProfileForm = () => {
  // const [cookies] = useCookies(["userInfo"]);
  const [mode, setMode] = useState(false);

  // const { store } = useContext(ReactReduxContext)
  let info;
info = JSON.parse(localStorage.getItem('user-info'));
  
  let profile;
  if(mode === false){
    profile = (
      <div style={{ margin: '0 26%' }}>
        <div className="profile">
          <figure>
            <Avatar src={info.avatar} alt="avatar" 
                    className="profileAvatar" size={256}/>
          </figure>
          <header>
            <h1>Hồ sơ của bạn:</h1>
          </header>
          <main>
            <dl>
              <dt>Tên</dt>
              <dd>{info.name}</dd>
              <dt>Email</dt>
              <dd>{info.email}</dd>
              <dt>Cấp độ dự đoán</dt>
              <dd>{info.level}</dd>
              <dt>Điểm của bạn</dt>
              <dd>{info.point}</dd>
              <dd><div>
                  <Button href="/" danger size={'large'} 
                    style={{width:"30%"}}>Thoát</Button> 
                  </div> 
              </dd>
            </dl>
            </main>
        </div>
      </div>
    )
  }

  return (
    <div>     
      {profile}
    </div>
  )
}
export default ProfileForm