import React from 'react';
import Popup from 'reactjs-popup';


export default function PopupComponent() {
    return (
        <div>

            <Popup trigger= {<button> Click to open modal </button>} modal nested>
                <div>
                    fatih kazan
                </div>
                {
                    close => (
                        <div >
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                                <button onClick=
                                            {() => close()}>
                                    Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};