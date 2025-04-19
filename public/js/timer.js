function GetTime(){
    const deadline = new Date(2025, 4, 10);
    let date =deadline.getTime() - new Date().getTime();
    const allDate = [
         date > 0 ? ZeroFirst(Math.floor(date / 1000 / 60 / 60 / 24)) : 0,
         date > 0 ? ZeroFirst(Math.floor(date / 1000 / 60 / 60) % 24) : 0,
         date > 0 ? ZeroFirst(Math.floor(date / 1000 / 60) % 60) : 0,
         date > 0 ? ZeroFirst(Math.floor(date / 1000) % 60) : 0
    ];
    function ZeroFirst(num){return (num.toString()).length==1?'0:'+num.toString():num}
    const TextTime=document.querySelectorAll("section:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1) div p");
    allDate.forEach((elem,index)=>TextTime[index].textContent=elem);
    date<0?clearInterval():null;
}
    setInterval(GetTime);