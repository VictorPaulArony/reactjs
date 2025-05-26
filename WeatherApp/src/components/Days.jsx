import React from "react";

const Days = () => {
    const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getPastDays = () => {
        const today = new Date().getDay()
        const pastDays = []

        for (let i = 4; i > 0; i--) {
            const dayId = (today - i + 7) % 7
            pastDays.push(allDays[dayId])
        }
        return pastDays;
    }

    const setDays = getPastDays()
    return (
        <div
            style={{
                textAlign: 'center',
                color: '#fff',
            }
            }>
            <h2>last four days</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                {setDays.map((day, index) => (
                    <div key={index} style={{
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                        padding: '5px',
                        margin: '5px',
                        height: '150px',
                        width: '100px',
                        textAlign: 'center',
                        borderRadius: '8px',
                        backdropFilter: 'blur(0.5px)',
                    }}>{day}
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Days;