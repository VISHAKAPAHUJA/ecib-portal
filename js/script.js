document.addEventListener('DOMContentLoaded', function() {
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
        // Validate inputs
        const newNic = document.getElementById('newNic').value;
        const passportNo = document.getElementById('passportNo').value;
        const ntn = document.getElementById('ntn').value;
        const oldNic = document.getElementById('oldNic').value;
        const dob = document.getElementById('dob').value;
        
        // At least one field should be filled
        if (!newNic && !passportNo && !ntn && !oldNic && !dob) {
            alert('Please fill at least one search field');
            return;
        }
        
        // Here you would typically make an API call to fetch CIR data
        // For now, we'll use mock data
        const mockData = {
            asOfDate: '30-JUN-25',
            cnic: '36001-1544710-2',
            name: 'SIMZA FATIMA',
            taxNo: '-',
            borrowerCode: '36001-1544710-2',
            incOld: '22-MJH69',
            dob: '22-JUN-69',
            fatherName: 'Father',
            addressCity: 'DISTRICT VENWB',
            passportNo: '-'
        };
        
        // Display the results
        displayResults(mockData);
        
        console.log('Search initiated with:', {
            newNic,
            passportNo,
            ntn,
            oldNic,
            dob
        });
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
    
    // Function to generate CWR document
    function generateCWRDocument(data) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add header
            doc.setFontSize(18);
            doc.setTextColor(40, 62, 80); // Dark blue color
            doc.text('eCIB Credit Information Report', 105, 20, { align: 'center' });
            
            // Add divider line
            doc.setDrawColor(52, 152, 219); // Blue color
            doc.setLineWidth(0.5);
            doc.line(20, 25, 190, 25);
            
            // Set default font
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Black color
            
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
            doc.setTextColor(100, 100, 100); // Gray color
            doc.text('© eCIB Electronic Credit Information Bureau', 105, 285, { align: 'center' });
            
            // Save the PDF
            doc.save(`CWR_${data.cnic}_${new Date().toISOString().slice(0,10)}.pdf`);
            
        } catch (error) {
            console.error('Error generating CWR document:', error);
            alert('Error generating PDF document. Please try again or contact support.');
        }
    }

    // Additional existing functionality can be added below
    // For example, navigation menu handlers or other event listeners
});