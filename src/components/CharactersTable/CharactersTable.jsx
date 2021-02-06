import React, { useMemo, Fragment } from 'react';
import { useTable, useExpanded } from 'react-table';
import { COLUMNS } from './columns';
import PropTypes from 'prop-types';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CharactersTable = ({ characters }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => characters, [characters]);
  const tableInstance = useTable({ columns, data }, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = tableInstance;

  const renderRowSubComponent = row => {
    const alies = row.values.expander;
    return (
      <ul>
        {alies.map(el => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    );
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {row.isExpanded && (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSubComponent(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

CharactersTable.propTypes = {
  // bla: PropTypes.string,
};

CharactersTable.defaultProps = {
  // bla: 'test',
};

export default CharactersTable;
