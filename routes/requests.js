const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.json');

const readData = () => {
    try {
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Ошибка чтения файла:", error);
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    let requests = readData();
    
    if (req.query.status) {
        requests = requests.filter(r => r.status === req.query.status);
    }
    
    res.status(200).json(requests);
});

router.get('/:id', (req, res) => {
    const requests = readData();
    const requestItem = requests.find(r => r.id === req.params.id);

    if (!requestItem) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(200).json(requestItem);
});


router.post('/', (req, res) => {
    const requests = readData();
    const { equipmentType, modelingType, inputData } = req.body;

    if (!equipmentType || !modelingType || !inputData) {
        return res.status(400).json({ 
            error: "Необходимы параметры: equipmentType, modelingType, inputData" 
        });
    }

    const newRequest = {
        id: Date.now().toString(),
        equipmentType,
        modelingType,
        status: "pending",
        inputData,
        results: null
    };

    requests.push(newRequest);
    writeData(requests);

    res.status(201).json(newRequest);
});

router.put('/:id', (req, res) => {
    const requests = readData();
    const index = requests.findIndex(r => r.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    const updatedRequest = { ...requests[index], ...req.body };
    
    requests[index] = updatedRequest;
    writeData(requests);

    res.status(200).json(updatedRequest);
});


router.delete('/:id', (req, res) => {
    const requests = readData();
    const index = requests.findIndex(r => r.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    requests.splice(index, 1);
    writeData(requests);

    res.status(200).json({ message: `Заявка с ID ${req.params.id} успешно удалена` });
});

module.exports = router;