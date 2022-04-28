import './Home.css'

function Home() {
    return (
        <div class="content">
            <img src="FastRoutingLogo.png" alt="" class="image"/>
            <h1 style={{color:"blue",textAlign:"center"}} >About</h1><br />
            <p style={{textAlign:"center", paddingLeft:"400px", paddingRight:"400px"}}>This App can be used to create a multiple vehicle route delivery. By inputting the data of your drivers and recipients, 
                this app will use Bing Maps to create an optimized route for your drivers to follow, as well as allow you to view a map 
                of those routes.</p><br />
            <h1 style={{color:"blue", textAlign:"center"}}>Instructions</h1><br />
            <h3 style={{color:"navy", paddingLeft:"400px"}}>How to add new data:</h3>
            <p style={{paddingLeft:"400px", paddingRight:"300px"}}>
                To add a single new Driver to this App: 
                <ol style={{paddingLeft:"100px"}}>
                    <li>Click on Data at the upper right</li>
                    <li>Click Add Driver to the right of the Driver title</li>
                    <li>Enter all eligable fields of data</li>
                    <li>Click the Submit button</li>
                </ol>
                To add a single new Recipient to this App: 
                <ol style={{paddingLeft:"100px"}}>
                    <li>Click on Data at the upper right</li>
                    <li>Click Add Recipient to the right of the Driver title</li>
                    <li>Enter all eligable fields of data</li>
                    <li>Click the Submit button</li>
                </ol>

                Once a Driver or Recipient has been added, you may edit the data by clicking on Edit in
                any Driver or Recipients row.<br /><br />
                <h3 style={{color:"navy"}}>How to add multiple Drivers or Recipients simultaneously:</h3>
                To add multiple Drivers or Recipients at a time, prepare an Excel spreadsheet 
                or Comma Separated Value (CSV) file with the header format as follows:<br /><br />
                For Drivers, the first line of the file should be in the format:<br />
                <table>
                    <tr>
                        <td style={{border:"2px solid black"}}>Firstname</td>
                        <td style={{border:"2px solid black"}}>Lastname</td>
                        <td style={{border:"2px solid black"}}>Role</td>
                        <td style={{border:"2px solid black"}}>Availability</td>
                        <td style={{border:"2px solid black"}}>Language</td>
                        <td style={{border:"2px solid black"}}>Phone</td>
                        <td style={{border:"2px solid black"}}>Capacity</td>
                    </tr>
                </table>
                <br/>
                Firstname: The given name of the Driver <br/>
                Lastname: The family name of the Driver <br/>
                Role: If the Driver is an Employee or a Volunteer<br/>
                Availability: How many Hours the Driver can work if they are a volunteer<br/>
                Language: What languages the Driver can communicate in<br/>
                Phone: The phone number of the Driver<br/>
                Capacity: The capacity of the vehicle<br/>
                <br />
                For Recipients, the first line of the file should be in the format:<br />
                <table style={{border:"1px solid black"}}>
                    <tr>
                        <td style={{border:"2px solid black"}}>Phone</td>
                        <td style={{border:"2px solid black"}}>Firstname</td>
                        <td style={{border:"2px solid black"}}>Lastname</td>
                        <td style={{border:"2px solid black"}}>Address</td>
                        <td style={{border:"2px solid black"}}>City</td>
                        <td style={{border:"2px solid black"}}>State</td>
                        <td style={{border:"2px solid black"}}>Zipcode</td>
                        <td style={{border:"2px solid black"}}>Center</td>
                        <td style={{border:"2px solid black"}}>Room_Number</td>
                        <td style={{border:"2px solid black"}}>Language</td>
                        <td style={{border:"2px solid black"}}>Quantity</td>
                    </tr>
                </table>
                <br/>
                Phone: The Phone Number of the Recipient<br/>
                Firstname: The given name of the Recipient<br/>
                Lastname: The family name of the Recipient<br/>
                Address: The Address of the Recipient<br/>
                City: The City the Recipient lives in<br/>
                State: The State of the Recipient<br/>
                Zipcode: The Zipccode of the Recipient <br/>
                Center: If the address is the ISC Address, set to 0 otherwise<br/>
                Room_Number: The Room Number of the Recipient, if applicable, otherwise leave blank.<br/>
                Language: The Languages the Recipient can communiacate in<br/>
                Quantity: The Quantity of packages the Recipient requests<br/>
                <br />
                These files can be uploaded by clicking on the Browse Files button and browsing to your prepared file on your computer.<br /><br />
                <h3 style={{color:"navy"}}>How to create new Routes:</h3>
                To create a Route from the provided Data, at the top of the screen, click Create Route, you will be taken to a new page. 
                <ol style={{paddingLeft:"100px"}}>
                    <li>Select the Maximum Capacity hat the Drivers can deliver</li>
                    <li>Select the Maximum Hours the volunteers can work this assignment</li>
                    <li>Select the Departure Location if one is not already selected</li>
                    <li>Enter the drivers to be added to the assignment
                        <ol>
                            <li>Click the empty box next to Driver</li>
                            <li>Choose a driver from the dropdown list</li>
                            <li>Click the empty space next to the added driver and repeat to add more drivers</li>
                        </ol>
                    </li>
                    <li>Enter the Recipients to be delivered to on this assignment
                        <ul><li>Enter Recipients the same way as above</li></ul>
                    </li>
                    <li>Click Create Route button</li>
                </ol>
                The algorithm will run and display the results when it is finished.<br /><br />
                
                <h3 style={{color:"navy"}}>Viewing Results:</h3>
                Once the assignment is complete, you may:
                <ul style={{paddingLeft:"100px"}}>
                    <li>Click View Map to open a new window containing a static Bing map of the resulting routes</li>
                </ul>
                <br />
            </p>
            <h1 style={{color:"blue", textAlign:"center"}}>Credits</h1><br />
            <p style={{textAlign:"center" }}>
                <h4 style={{color:"navy"}}>Sponsored by:</h4>
                <strong>Fabio Vitor, Ph.D.</strong><br />
                Assistant Professor<br />
                Department of Mathematics <br />
                University of Nebraska at Omaha<br />
                Email: ftorresvitor@unomaha.edu<br />
                Phone: (402) 554-2691<br /><br />

                <h4 style={{color:"navy"}}>Fall 2021 UNO Capstone Team:</h4>
                Liam Betterman<br />
                Scott Negus<br />
                Kamryn Pullen<br />
                Isidore Sossa<br /><br />

                <h4 style={{color:"navy"}}>Spring 2022 UNO Capstone Team:</h4>
                Nick Cox<br />
                Joel McMaken<br />
                Will Palmer<br />
                Jake Peterson<br /><br />
            </p>
        </div>
    );
}

export default Home;
