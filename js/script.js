document.addEventListener('DOMContentLoaded', function() {
    // Valid CNICs database
    const validCNICs = [
        '42101-1234567-1',
        '35202-7654321-0',
        '61101-9988776-3',
        '37406-1122334-5'
    ];

    // Mock data for each valid CNIC
    const mockDataDatabase = {
        '42101-1234567-1': {
            asOfDate: '30-JUN-25',
            cnic: '42101-1234567-1',
            name: 'ALI KHAN',
            taxNo: '421011234567',
            borrowerCode: '42101-1234567-1',
            incOld: '421011234567',
            dob: '05/05/2000',
            fatherName: 'ABDUL KHAN',
            addressCity: 'KARACHI',
            passportNo: 'PK1234567'
        },
        '35202-7654321-0': {
            asOfDate: '30-JUN-25',
            cnic: '35202-7654321-0',
            name: 'Ahmed Ali',
            taxNo: '352027654321',
            borrowerCode: '35202-7654321-0',
            incOld: '352027654321',
            dob: '10/12/1998',
            fatherName: 'MUHAMMAD AHMED',
            addressCity: 'LAHORE',
            passportNo: 'PK7654321'
        },
        '61101-9988776-3': {
            asOfDate: '30-JUN-25',
            cnic: '61101-9988776-3',
            name: 'Sara Khan',
            taxNo: '611019988776',
            borrowerCode: '61101-9988776-3',
            incOld: '611019988776',
            dob: '18/09/2001',
            fatherName: 'MAHMOOD ALI',
            addressCity: 'ISLAMABAD',
            passportNo: 'PK9988776'
        },
        '37406-1122334-5': {
            asOfDate: '30-JUN-25',
            cnic: '37406-1122334-5',
            name: 'Usman Tariq',
            taxNo: '374061122334',
            borrowerCode: '37406-1122334-5',
            incOld: '374061122334',
            dob: '20/03/1997',
            fatherName: 'JAVED IQBAL',
            addressCity: 'PESHAWAR',
            passportNo: 'PK1122334'
        }
    };

    // Check if jsPDF is available
    const pdfLibraryLoaded = typeof window.jspdf !== 'undefined';
    if (!pdfLibraryLoaded) {
        console.error('jsPDF library not loaded - PDF generation will be unavailable');
    }

    // Clear All button functionality
    const clearBtn = document.querySelector('.clear-btn');
    clearBtn.addEventListener('click', function() {
        // Clear all input fields
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        // Hide results section
        document.getElementById('resultsSection').style.display = 'none';
        
        console.log('All fields cleared and results hidden');
    });

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        // Get search values
        const newNic = document.getElementById('newNic').value.trim();
        const oldNic = document.getElementById('oldNic').value.trim();
        
        // Check if CNIC field is filled
        if (!newNic && !oldNic) {
            alert('Please enter either New NIC or Old NIC');
            return;
        }
        
        // Check against valid CNICs
        const searchCNIC = newNic || oldNic;
        if (validCNICs.includes(searchCNIC)) {
            // Display matching record
            displayResults(mockDataDatabase[searchCNIC]);
        } else {
            // Show "Record not found" message
            const resultsSection = document.getElementById('resultsSection');
            const tableBody = document.getElementById('resultsTableBody');
            
            // Clear previous results
            tableBody.innerHTML = '';
            
            // Create message row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="11" style="text-align: center; color: red; font-weight: bold;">
                    Record not found for CNIC: ${searchCNIC}
                </td>
            `;
            tableBody.appendChild(row);
            
            // Show the results section
            resultsSection.style.display = 'block';
        }
        
        console.log('Search initiated for CNIC:', searchCNIC);
    });
    
    // Function to display results in the table
    function displayResults(data) {
        const resultsSection = document.getElementById('resultsSection');
        const tableBody = document.getElementById('resultsTableBody');
        
        // Clear previous results
        tableBody.innerHTML = '';
        
        // Create new row with the data
        const row = document.createElement('tr');
        
        // Add each data point to the row
        row.innerHTML = `
            <td>${data.asOfDate}</td>
            <td>${data.cnic}</td>
            <td>${data.name}</td>
            <td>${data.taxNo}</td>
            <td>${data.borrowerCode}</td>
            <td>${data.incOld}</td>
            <td>${data.dob}</td>
            <td>${data.fatherName}</td>
            <td>${data.addressCity}</td>
            <td>${data.passportNo}</td>
            <td><button class="cwr-btn">CWR</button></td>
        `;
        
        tableBody.appendChild(row);
        
        // Add event listener to the CWR button
        const cwrBtn = row.querySelector('.cwr-btn');
        cwrBtn.addEventListener('click', function() {
            if (pdfLibraryLoaded) {
                generateCWRDocument(data);
            } else {
                alert('PDF generation is currently unavailable. Please ensure jsPDF library is loaded and try again.');
                console.error('jsPDF library not available for PDF generation');
            }
        });
        
        // Show the results section
        resultsSection.style.display = 'block';
    }
    
    // Function to generate CWR document (unchanged)
    function generateCWRDocument(data) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add header
            doc.setFontSize(18);
            doc.setTextColor(40, 62, 80);
            doc.text('eCIB Credit Information Report', 105, 20, { align: 'center' });
            
            // Add divider line
            doc.setDrawColor(52, 152, 219);
            doc.setLineWidth(0.5);
            doc.line(20, 25, 190, 25);
            
            // Set default font
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            let yPosition = 40;
            
            // Add customer information section
            doc.setFont(undefined, 'bold');
            doc.text('Customer Information:', 20, yPosition);
            yPosition += 10;
            
            doc.setFont(undefined, 'normal');
            doc.text(`Name: ${data.name}`, 20, yPosition);
            yPosition += 8;
            doc.text(`CNIC: ${data.cnic}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Date of Birth: ${data.dob}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Father's Name: ${data.fatherName}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Address: ${data.addressCity}`, 20, yPosition);
            yPosition += 12;
            
            // Add document details section
            doc.setFont(undefined, 'bold');
            doc.text('Document Details:', 20, yPosition);
            yPosition += 10;
            
            doc.setFont(undefined, 'normal');
            doc.text(`As of Date: ${data.asOfDate}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Borrower Code: ${data.borrowerCode}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 20, yPosition);
            yPosition += 15;
            
            // Add footer
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('© eCIB Electronic Credit Information Bureau', 105, 285, { align: 'center' });
            
            // Save the PDF
            doc.save(`CWR_${data.cnic}_${new Date().toISOString().slice(0,10)}.pdf`);
            
        } catch (error) {
            console.error('Error generating CWR document:', error);
            alert('Error generating PDF document. Please try again or contact support.');
        }
    }
});