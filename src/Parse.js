	import React, { useState } from 'react';
	import Papa from 'papaparse';

	function CSVTable() {
		const [csvData, setCsvData] = useState([]);
		const [headers, setHeaders] = useState([]);

		const handleFileChange = (event) => {
			const file = event.target.files[0];
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				skipEmptyLines: true,
				complete: function (result) {
					if (result.meta.fields) {
					setHeaders(result.meta.fields);
					setCsvData(result.data);
					}
				},
				error: function (error) {
					console.error('Error parsing CSV:', error.message);
				},
			});
		};

		return (
			<div>
				<input
				type="file"
				accept=".csv"
				onChange={handleFileChange}
				/>

				{csvData.length > 0 && (
					<table>
						<thead>
							<tr>
							{headers.map((header) => (
								<th key={header}>{header}</th>
							))}
							</tr>
						</thead>
						<tbody>
							{csvData.map((row, index) => (
								<tr key={index}>
									{headers.map((header) => (
										<td key={header}>{row[header]}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
	);
	}

	export default CSVTable;