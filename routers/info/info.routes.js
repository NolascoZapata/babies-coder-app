const express = require('express')
const os = require('os')
const router = express.Router()
const modoCluster = process.argv[3] == 'CLUSTER'
const compresion = require('compression')


let mod1 = {mode:'FORK',worker:'1'}
let mod2 = {mode:'CLUSTER',worker:os.cpus().length}

let mode
modoCluster? mode=mod2 : mode=mod1

router.get('/',(req, res) => {
    const infoObj = {
        DirectorioTrabajo: process.cwd(),
        IdProceso: process.pid,
        VersionNode: process.version,
        TituloProceso: process.title,
        SistemaOperativo: process.platform,
        UsoMemoriaRSS: process.memoryUsage().rss,
        Modo: mode.mode,
        NumeroDeProcesadoresPresentesEnElServidor: mode.worker,


    }
    res.json(infoObj)}
)
router.get('/compression', compresion(),(req, res) => {
    const infoObj = {
        DirectorioTrabajo: process.cwd(),
        IdProceso: process.pid,
        VersionNode: process.version,
        TituloProceso: process.title,
        SistemaOperativo: process.platform,
        UsoMemoriaRSS: process.memoryUsage().rss,
        Modo: mode.mode,
        NumeroDeProcesadoresPresentesEnElServidor: mode.worker,
        
    }
    res.json(infoObj)}
)



module.exports = router