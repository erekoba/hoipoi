import React, { useState, useEffect, Component } from "react";
import firebase from "../firebase";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const createData = (
    name: string,
    category: string,
    weight: number,
    price: number
) => {
    return { name, category, weight, price };
};



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


type MessageProps = {
    id: string,
    data: firebase.firestore.DocumentData;
}

const ProductPage: React.FC = (props) => {

    const classes = useStyles();

    const [update, setUpdate] = useState('');
    const [searchcategory, setSearchcategory] = useState('');
    const [FigureList, setFigureList] = useState<MessageProps[]>([]);
    // 予約データの取得
    const getFiguresFromFirestore = async () => {
        const itemListArray = await firebase
            .firestore()
            .collection("reserves")
            .get();
        const Array = itemListArray.docs.map((x) => {
            return {
                id: x.id,
                data: x.data(),
            };
        });
        setFigureList(Array);
        return Array;
    };
    //フィギュア毎に検索
    const searchData = async () => {
        const itemListArray1 = await firebase
            .firestore()
            .collection("reserves")
            .where('figureID', '==', searchcategory)
            .get();
        const Array1 = itemListArray1.docs.map((x) => {
            return {
                id: x.id,
                data: x.data(),
            };
        });

        console.log(Array1)
        setFigureList(Array1);
    }
    // 検索結果に基づき更新
    const updateData = async () => {
        for (var i = 0; i < FigureList.length; i++) {
            const updateRef = await firebase
                .firestore()
                .collection("reserves")
                .doc(FigureList[i].id);
            await updateRef.update({
                Release: update
            })
        }
        setUpdate('');
        setSearchcategory('')
        getFiguresFromFirestore()
    }


    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = getFiguresFromFirestore();
    }, [props]);
    console.log(FigureList)


    return (
        <GenericTemplate title="発売日変更ページ">
            <form>
                <p>検索</p>
                <select name="フィルタ">
                    <option value="figureID">フィギュアID</option>
                    <option value="figureName">フィギュア名</option>
                    <option value="発売日">発売日</option>
                </select>
                <input
                    type="text"
                    value={searchcategory}
                    onChange={(e) => setSearchcategory(e.target.value)}
                ></input>
                <button type="button" onClick={searchData}>
                    search
                </button>
                <p>発売日変更</p>
                <input
                    type="text"
                    value={update}
                    onChange={(e) => setUpdate(e.target.value)}
                ></input>
                <button type="button" onClick={updateData}>
                    update
                </button>
            </form>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>フィギュアID</TableCell>
                            <TableCell>商品名</TableCell>
                            <TableCell align="right">価格</TableCell>
                            <TableCell align="right">発売日</TableCell>
                            <TableCell align="right">ユーザーID</TableCell>
                            <TableCell align="right">支払い状況</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            FigureList[0] === undefined
                                ? <a></a>
                                : FigureList?.map((x) => (
                                    <TableRow key={x.id}>
                                        <TableCell component="th" scope="row">
                                            {x.data.figureID}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {x.data.figureName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {x.data.Price}
                                        </TableCell>
                                        <TableCell align="right">
                                            {x.data.Release}
                                        </TableCell>
                                        <TableCell align="right">
                                            {x.data.user}
                                        </TableCell>
                                        <TableCell align="right">
                                            {x.data.Payment}
                                        </TableCell>
                                    </TableRow>
                                ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </GenericTemplate>
    );
};

export default ProductPage;
