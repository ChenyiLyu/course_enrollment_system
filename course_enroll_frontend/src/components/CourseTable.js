import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

// const mockCourses = [
//     {"courseName":"Aut ut","courseLocation":"Apt. 604","courseContent":"Doloribus repudiandae sed quasi perspiciatis itaque sit deserunt.","teacherId":28},
//     {"courseName":"Facere error","courseLocation":"Apt. 860","courseContent":"Veritatis voluptas placeat voluptas.","teacherId":91},
//     {"courseName":"Repellendus reprehenderit voluptas","courseLocation":"Apt. 718","courseContent":"Nihil omnis distinctio ad iure.","teacherId":82},
//     {"courseName":"Eos labore","courseLocation":"Apt. 614","courseContent":"Eius nulla voluptatem.","teacherId":19},
// ];

export default function CourseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Content</TableCell>
            <TableCell align="right">Course Location</TableCell>
            <TableCell align="right">Teacher ID</TableCell>
            { 
                props.actionButtonLabel 
                  ? <TableCell align="right">Action</TableCell>
                  : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
            {renderCourses()}
        </TableBody>
      </Table>
    </TableContainer>
  );

  function renderCourses() {
      return(
        props.courses.map((row, i) => (
            <TableRow key={row.courseName}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.course_name}</TableCell>
              <TableCell align="right">{row.course_content}</TableCell>
              <TableCell align="right">{row.course_location}</TableCell>
              <TableCell align="right">{row.teacher_id}</TableCell>
              {
                props.actionButtonLabel
                ? <TableCell align="right">
                <Button color="primary" variant="contained" onClick={() => props.onActionButtonClick(row)}>
                  {props.actionButtonLabel}
                </Button>
                 </TableCell>
                : null
              }

            </TableRow>
          ))
      );
  }
}
