const Lawsuit = require('../models/Lawsuit');
const fs = require('fs');
const path = require('path');

exports.submitLawsuit = async (req, res) => {
    try {
        // Sprawdzenie czy przesłano pliki
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Musisz załączyć przynajmniej jeden dokument PDF związany ze sprawą!'
            });
        }

        // Przygotowanie ścieżek do zapisania w bazie
        const documents = req.files.map(file =>
            `lawsuits/${file.filename}`
        );

        const lawsuit = new Lawsuit({
            plaintiff: req.body.plaintiff,
            caseNumber: req.body.caseNumber,
            subject: req.body.subject,
            message: req.body.message,
            documents: documents,
        });

        await lawsuit.save();

        res.status(201).json({
            success: true,
            message: 'Pozew został przyjęty!',
            lawsuit
        });

    } catch (error) {
        // Usuwanie już przesłanych plików jeśli błąd
        if (req.files) {
            req.files.forEach(file => {
                fs.unlinkSync(path.join('uploads', file.path));
            });
        }

        res.status(500).json({
            success: false,
            message: 'Coś poszło nie tak podczas składania pozwu',
            error: error.message
        });
    }
};

exports.getAllLawsuits = async (req, res) => {
    const lawsuits = await Lawsuit.find();
    res.json(lawsuits);
};
