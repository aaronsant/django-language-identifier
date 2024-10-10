import react from "react";
import "../styles/SubmissionTable.css"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function SubmissionTable(props) {

    const endpointToMethod = {
        "linear_svc":"Linear Classifier",
        "bernoulli_nb":"Naive Bayes (Bernoulli)",
        "multinomial_nb":"Naive Bayes (Multinomial)",
        "logistic_regression":"Logistic Classifier",
        "random_forest":"Random Forest",
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Text</StyledTableCell>
              <StyledTableCell align="right">Language</StyledTableCell>
              <StyledTableCell align="right">Method</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.toReversed().map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.content}
                </StyledTableCell>
                <StyledTableCell align="right"><strong>{row.language_detected}</strong></StyledTableCell>
                <StyledTableCell align="right">{endpointToMethod[row.endpoint_name]}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.created_at).toLocaleString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SubmissionTable;