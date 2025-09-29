const fs = require('fs');
const path = require('path');

class FileHelper {
    static deleteFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`File deleted: ${filePath}`);
                return true;
            }
            return true;
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
            return false;
        }
    }

    static getFileSize(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                return stats.size;
            }
            return null;
        } catch (error) {
            console.error(`Error getting file size for ${filePath}:`, error);
            return null;
        }
    }

    static fileExists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (error) {
            console.error(`Error checking file existence ${filePath}:`, error);
            return false;
        }
    }

    static getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }

    static getRelativePath(absolutePath) {
        const projectRoot = process.cwd();
        return path.relative(projectRoot, absolutePath);
    }

    static getFileUrl(relativePath, baseUrl) {
        const urlPath = relativePath.replace(/\\/g, '/');
        return `${baseUrl}/${urlPath}`;
    }

    static cleanOldFiles(directory, daysOld = 30) {
        let deletedCount = 0;
        try {
            if (!fs.existsSync(directory)) {
                return deletedCount;
            }

            const files = fs.readdirSync(directory);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);

            files.forEach((file) => {
                const filePath = path.join(directory, file);
                const stats = fs.statSync(filePath);

                if (stats.isFile() && stats.mtime < cutoffDate) {
                    if (this.deleteFile(filePath)) {
                        // eslint-disable-next-line no-plusplus
                        deletedCount++;
                    }
                }
            });

            console.log(`Cleaned ${deletedCount} old files from ${directory}`);
        } catch (error) {
            console.error(`Error cleaning old files from ${directory}:`, error);
        }

        return deletedCount;
    }
}

module.exports = FileHelper;