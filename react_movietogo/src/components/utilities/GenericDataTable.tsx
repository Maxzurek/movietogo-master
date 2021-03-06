import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownItem, DropdownMenu, Header, Message, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import DisplayApiErrors from "./DisplayApiErrors";

interface DataTableProps {
    url: string;
    tableName: string;
    refresh?: boolean;
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
    maxHeight?: string;
    color?: SemanticCOLORS;
}

GenericDataTable.defaultProps = {
    maxHeight: '100%',
    color: 'grey',
}

export default function GenericDataTable(props: DataTableProps) {

    const [response, setResponse] = useState<AxiosResponse<any>>();
    const [error, setError] = useState<AxiosError>();
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [labelColor, setLabelColor] = useState<SemanticCOLORS>('yellow');

    const LOADING_COLOR = 'yellow';
    const LOADED_COLOR = 'green';
    const ERROR_COLOR = 'red';
    const NO_DATA_COLOR = 'orange';

    useEffect(() => { // On component created and refresh or url changed
        const getRequest = async () => {
            try {
                const response = await axios.get(props.url);
                setResponse(response);

                if (Array.isArray(response.data)) {
                    setData(response.data as []);
                }
                else {
                    setData(response.data.results);
                }

            } catch (error) {
                let axiosError = error as AxiosError;
                setData([])
                setResponse(undefined);
                setError(axiosError);
            }
        }

        if (props.refresh || props.setRefresh) {
            if (props.setRefresh !== undefined) {
                props.setRefresh(false);
            }
            setError(undefined);
            setLoading(true);
            getRequest();
        }
        else {
            getRequest();
        }

    }, [props])

    useEffect(() => { // Controls the loading state

        setKeys([]); // Reset keys or table headers will be duplicated

        if (response === undefined) // No response from the API
        {
            if (error?.isAxiosError) // We have an error from the API
            {
                setLoading(false);
                setLabelColor(ERROR_COLOR);
            }
            else // No error, still waiting for response
            {
                setLoading(true);
                setLabelColor(LOADING_COLOR);
            }
        }
        else // We have a response
        {
            if (data?.length > 0) // We have data!
            {
                setLoading(false);
                setLabelColor(LOADED_COLOR);

                const dataSample = data[0];

                Object.entries(dataSample).forEach(([key, value]) => {
                    setKeys(prevArray => [...prevArray, key]);
                });
            }
            else if (!error?.isAxiosError)// No data found
            {
                setLoading(false);
                setLabelColor(NO_DATA_COLOR);
            }
        }
    }, [response, error, data])

    const renderTableHeaderRows = () => {
        return (
            keys.map((header, index) => {
                return <TableHeaderCell key={index} >{header}</TableHeaderCell>
            })
        )
    }

    const getLines = (value: unknown): string[] => {

        var stringValue = '';

        if (value === null) {
            stringValue = "NULL";
        }
        else if (typeof value === "string") {
            stringValue = value;
        }
        else if (typeof value === "number" || typeof value === "boolean") {
            stringValue = value.toString();
        }
        else if (Array.isArray(value)) {
            stringValue = "[   ";

            if (value.length === 0) {
                stringValue = "empty";
            }
            else {
                stringValue += value.map((x, index) => {
                    let object = "";
                    let isLastItem = index === value.length - 1;

                    object += JSON.stringify(x)

                    if (!isLastItem) {
                        object += ';'
                    }
                    else {
                        object += '   ]'
                    }

                    return object;
                });
            }
        }
        else if (typeof value === "object") {
            stringValue = JSON.stringify(value);
        }

        let lines = stringValue.split(';');

        return lines;
    }

    const renderTableBodyRows = () => {

        return (
            data?.map((dataObject: any, index: number) => {
                return (
                    <TableRow key={index}>
                        {Object.entries(dataObject).map(([key, value]) => {

                            let lines = getLines(value);

                            return (
                                <TableCell
                                    key={key}
                                >
                                    {lines.length === 1 ?
                                        lines[0]
                                        :
                                        <Dropdown text="Array items" scrolling>
                                            <DropdownMenu>
                                                {lines.map((line, index) => {
                                                    return <DropdownItem key={index} text={line} />
                                                })}
                                            </DropdownMenu>
                                        </Dropdown>
                                    }
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )
            })
        )
    }

    const renderTable = () => {
        return (
            <Table celled size="large">
                <TableHeader>
                    <TableRow>
                        {renderTableHeaderRows()}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {renderTableBodyRows()}
                </TableBody>
            </Table>
        )
    }

    return (
        <Segment loading={loading}>
            <Segment inverted color={labelColor} textAlign="center" >
                <Header>{props.tableName}</Header>
            </Segment>
            <Container fluid style={{ overflow: 'auto', maxHeight: '550px' }}>
                {data?.length > 0 ? renderTable() : undefined}
                <DisplayApiErrors response={response} error={error} />
            </Container>
        </Segment>
    )
};
