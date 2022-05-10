cpdf = require('./cpdf');

//CHAPTER 0. Preliminaries
console.log("***** CHAPTER 0. Preliminaries");
console.log("---cpdf_startup()");
cpdf.startup();
console.log("---cpdf_version()");
console.log("version = %s", cpdf.version());
console.log("---cpdf_setFast()");
cpdf.setFast();
console.log("---cpdf_setSlow()");
cpdf.setSlow();
console.log("---cpdf_clearError()");

// CHAPTER 1. Basics
console.log("***** CHAPTER 1. Basics");
console.log("---cpdf_fromFile()");
var pdf = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_fromFileLazy()");
var pdf2 = cpdf.fromFileLazy("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_toMemory()");
var mempdf = cpdf.toMemory(pdf, false, false);
console.log("---cpdf_fromMemory()");
var frommem = cpdf.fromMemory(mempdf, "");
cpdf.toFile(frommem, "testoutputs/01fromMemory.pdf", false, false);
console.log("---cpdf_fromMemoryLazy()");
var frommemlazy = cpdf.fromMemoryLazy(mempdf, "");
cpdf.toFile(frommemlazy, "testoutputs/01fromMemoryLazy.pdf", false, false);
var pdf3 = cpdf.blankDocument(153.5, 234.2, 50);
var pdf4 = cpdf.blankDocumentPaper(cpdf.a4landscape, 50);
console.log("---cpdf: enumerate PDFs");
var n = cpdf.startEnumeratePDFs();
for (x = 0; x < n; x++)
{
    var key = cpdf.enumeratePDFsKey(x);
    var info = cpdf.enumeratePDFsInfo(x);
}
cpdf.endEnumeratePDFs();
console.log("---cpdf_ptOfIn()");
console.log("One inch is %s points", cpdf.ptOfIn(1.0).toFixed(6));
console.log("---cpdf_ptOfCm()");
console.log("One centimetre is %s points", cpdf.ptOfCm(1.0).toFixed(6));
console.log("---cpdf_ptOfMm()");
console.log("One millimetre is %s points", cpdf.ptOfMm(1.0).toFixed(6));
console.log("---cpdf_inOfPt()");
console.log("One point is %s inches", cpdf.inOfPt(1.0).toFixed(6));
console.log("---cpdf_cmOfPt()");
console.log("One point is %s centimetres", cpdf.cmOfPt(1.0).toFixed(6));
console.log("---cpdf_mmOfPt()");
console.log("One point is %s millimetres", cpdf.mmOfPt(1.0).toFixed(6));
console.log("---cpdf_range()");
var range = cpdf.range(1, 10);
console.log("---cpdf_all()");
var all = cpdf.all(pdf3);
console.log("---cpdf_even()");
var even = cpdf.even(all);
console.log("---cpdf_odd()");
var odd = cpdf.odd(all);
console.log("---cpdf_rangeUnion()");
var union = cpdf.rangeUnion(even, odd);
console.log("---cpdf_difference()");
var diff = cpdf.difference(even, odd);
console.log("---cpdf_removeDuplicates()");
var revdup = cpdf.removeDuplicates(even);
console.log("---cpdf_rangeLength()");
var length = cpdf.rangeLength(even);
console.log("---cpdf_rangeGet()");
var rangeget = cpdf.rangeGet(even, 1);
console.log("---cpdf_rangeAdd()");
var rangeadd = cpdf.rangeAdd(even, 20);
console.log("---cpdf_isInRange()");
var isin = cpdf.isInRange(even, 2);
console.log("---cpdf_parsePagespec()");
var r = cpdf.parsePagespec(pdf3, "1-5");
console.log("---cpdf_validatePagespec()");
var valid = cpdf.validatePagespec("1-4,5,6");
console.log("Validating pagespec gives %d", valid ? 1 : 0);
console.log("---cpdf_stringOfPagespec()");
var ps = cpdf.stringOfPagespec(pdf3, r);
console.log("String of pagespec is %s", ps);
console.log("---cpdf_blankRange()");
var b = cpdf.blankRange();
pdf10 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_pages()");
var pages = cpdf.pages(pdf10);
console.log("Pages = %i", pages);
console.log("---cpdf_pagesFast()");
var pagesfast = cpdf.pagesFast("", "testinputs/cpdflibmanual.pdf");
console.log("Pages = %i", pagesfast);
console.log("---cpdf_toFile()");
cpdf.toFile(pdf10, "testoutputs/01tofile.pdf", false, false);
console.log("---cpdf_toFileExt()");
cpdf.toFileExt(pdf10, "testoutputs/01tofileext.pdf", false, true, true, true, true);
console.log("---cpdf_isEncrypted()");
var isenc = cpdf.isEncrypted(pdf10);
console.log("isencrypted:%i", isenc ? 1 : 0);
console.log("---cpdf_isLinearized()");
var lin = cpdf.isLinearized("testinputs/cpdfmanual.pdf");
console.log("islinearized:%i", lin ? 1 : 0);
var pdf400 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var pdf401 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var permissions = [cpdf.noEdit];
console.log("---cpdf_toFileEncrypted()");
cpdf.toFileEncrypted(pdf400, cpdf.pdf40bit, permissions, "owner", "user", false, false, "testoutputs/01encrypted.pdf");
console.log("---cpdf_toFileEncryptedExt()");
cpdf.toFileEncryptedExt(pdf401, cpdf.pdf40bit, permissions, "owner", "user", false, false, true, true, true, "testoutputs/01encryptedext.pdf");
console.log("---cpdf_hasPermission()");
var pdfenc = cpdf.fromFile("testoutputs/01encrypted.pdf", "user");
var hasnoedit = cpdf.hasPermission(pdfenc, cpdf.noEdit);
var hasnocopy = cpdf.hasPermission(pdfenc, cpdf.noCopy);
console.log("Haspermission %d, %d", hasnoedit ? 1 : 0, hasnocopy ? 1 : 0);
console.log("---cpdf_encryptionKind()");
var enckind = cpdf.encryptionKind(pdfenc);
console.log("encryption kind is %d", enckind);
console.log("---cpdf_decryptPdf()");
cpdf.decryptPdf(pdf10, "");
console.log("---cpdf_decryptPdfOwner()");
cpdf.decryptPdfOwner(pdf10, "");

// CHAPTER 2. Merging and Splitting
console.log("***** CHAPTER 2. Merging and Splitting");
var pdf11 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var selectrange = cpdf.range(1, 3);
console.log("---cpdf_mergeSimple()");
var arr = [pdf11, pdf11, pdf11];
var merged = cpdf.mergeSimple(arr);
cpdf.toFile(merged, "testoutputs/02merged.pdf", false, true);
console.log("---cpdf_merge()");
var merged2 = cpdf.merge(arr, false, false);
cpdf.toFile(merged2, "testoutputs/02merged2.pdf", false, true);
console.log("---cpdf_mergeSame()");
var all = cpdf.all(pdf11);
var ranges = [all, all, all];
var merged3 = cpdf.mergeSame(arr, false, false, ranges);
cpdf.toFile(merged3, "testoutputs/02merged3.pdf", false, false);
console.log("---cpdf_selectPages()");
var pdf12 = cpdf.selectPages(pdf11, selectrange);
cpdf.toFile(pdf12, "testoutputs/02selected.pdf", false, false);

// CHAPTER 3. Pages
console.log("***** CHAPTER 3. Pages");
var pagespdf1 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r1 = cpdf.all(pagespdf1);
var pagespdf2 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r2 = cpdf.all(pagespdf2);
var pagespdf3 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r3 = cpdf.all(pagespdf3);
var pagespdf4 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r4 = cpdf.all(pagespdf4);
var pagespdf5 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r5 = cpdf.all(pagespdf5);
var pagespdf6 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r6 = cpdf.all(pagespdf6);
var pagespdf7 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r7 = cpdf.all(pagespdf7);
var pagespdf8 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r8 = cpdf.all(pagespdf8);
var pagespdf9 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r9 = cpdf.all(pagespdf9);
var pagespdf10 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r10 = cpdf.all(pagespdf10);
var pagespdf11 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r11 = cpdf.all(pagespdf11);
var pagespdf12 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r12 = cpdf.all(pagespdf12);
var pagespdf13 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r13 = cpdf.all(pagespdf13);
var pagespdf14 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r14 = cpdf.all(pagespdf14);
var pagespdf15 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r15 = cpdf.all(pagespdf15);
var pagespdf16 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r16 = cpdf.all(pagespdf16);
var pagespdf17 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r17 = cpdf.all(pagespdf17);
var pagespdf18 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r18 = cpdf.all(pagespdf18);
var pagespdf19 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var r19 = cpdf.all(pagespdf19);
console.log("---cpdf_scalePages()");
cpdf.scalePages(pagespdf1, r1, 1.5, 1.8);
cpdf.toFile(pagespdf1, "testoutputs/03scalepages.pdf", false, false);
console.log("---cpdf_scaleToFit()");
cpdf.scaleToFit(pagespdf2, r2, 1.5, 1.8, 0.9);
cpdf.toFile(pagespdf2, "testoutputs/03scaletofit.pdf", false, false);
console.log("---cpdf_scaleToFitPaper()");
cpdf.scaleToFitPaper(pagespdf3, r3, cpdf.a4portrait, 0.8);
cpdf.toFile(pagespdf3, "testoutputs/03scaletofitpaper.pdf", false, false);
console.log("---cpdf_scaleContents()");
cpdf.scaleContents(pagespdf4, r4, cpdf.topLeft, 20.0, 20.0, 2.0);
cpdf.toFile(pagespdf4, "testoutputs/03scalecontents.pdf", false, false);
console.log("---cpdf_shiftContents()");
cpdf.shiftContents(pagespdf5, r5, 1.5, 1.25);
cpdf.toFile(pagespdf5, "testoutputs/03shiftcontents.pdf", false, false);
console.log("---cpdf_rotate()");
cpdf.rotate(pagespdf6, r6, 90);
cpdf.toFile(pagespdf6, "testoutputs/03rotate.pdf", false, false);
console.log("---cpdf_rotateBy()");
cpdf.rotateBy(pagespdf7, r7, 90);
cpdf.toFile(pagespdf7, "testoutputs/03rotateby.pdf", false, false);
console.log("---cpdf_rotateContents()");
cpdf.rotateContents(pagespdf8, r8, 35.0);
cpdf.toFile(pagespdf8, "testoutputs/03rotatecontents.pdf", false, false);
console.log("---cpdf_upright()");
cpdf.upright(pagespdf9, r9);
cpdf.toFile(pagespdf9, "testoutputs/03upright.pdf", false, false);
console.log("---cpdf_hFlip()");
cpdf.hFlip(pagespdf10, r10);
cpdf.toFile(pagespdf10, "testoutputs/03hflip.pdf", false, false);
console.log("---cpdf_vFlip()");
cpdf.vFlip(pagespdf11, r11);
cpdf.toFile(pagespdf11, "testoutputs/03vflip.pdf", false, false);
console.log("---cpdf_crop()");
cpdf.crop(pagespdf12, r12, 0.0, 0.0, 400.0, 500.0);
cpdf.toFile(pagespdf12, "testoutputs/03crop.pdf", false, false);
console.log("---cpdf_trimMarks()");
cpdf.trimMarks(pagespdf13, r13);
cpdf.toFile(pagespdf13, "testoutputs/03trim_marks.pdf", false, false);
console.log("---cpdf_showBoxes()");
cpdf.showBoxes(pagespdf14, r14);
cpdf.toFile(pagespdf14, "testoutputs/03show_boxes.pdf", false, false);
console.log("---cpdf_hardBox()");
cpdf.hardBox(pagespdf15, r15, "/MediaBox");
cpdf.toFile(pagespdf15, "testoutputs/03hard_box.pdf", false, false);
console.log("---cpdf_removeCrop()");
cpdf.removeCrop(pagespdf16, r16);
cpdf.toFile(pagespdf16, "testoutputs/03remove_crop.pdf", false, false);
console.log("---cpdf_removeTrim()");
cpdf.removeTrim(pagespdf17, r17);
cpdf.toFile(pagespdf17, "testoutputs/03remove_trim.pdf", false, false);
console.log("---cpdf_removeArt()");
cpdf.removeArt(pagespdf18, r18);
cpdf.toFile(pagespdf18, "testoutputs/03remove_art.pdf", false, false);
console.log("---cpdf_removeBleed()");
cpdf.removeBleed(pagespdf19, r19);
cpdf.toFile(pagespdf19, "testoutputs/03remove_bleed.pdf", false, false);
        
// CHAPTER 4. Encryption
// Encryption covered under Chapter 1 in cpdflib.

// CHAPTER 5. Compression
console.log("***** CHAPTER 5. Compression");
var pdf16 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "")
console.log("---cpdf_compress()");
cpdf.compress(pdf16);
cpdf.toFile(pdf16, "testoutputs/05compressed.pdf", false, false);
console.log("---cpdf_decompress()");
cpdf.decompress(pdf16);
cpdf.toFile(pdf16, "testoutputs/05decompressed.pdf", false, false);
console.log("---cpdf_squeezeInMemory()");
cpdf.squeezeInMemory(pdf16);
cpdf.toFile(pdf16, "testoutputs/05squeezedinmemory.pdf", false, false);
 
// CHAPTER 6. Bookmarks
console.log("***** CHAPTER 6. Bookmarks");
var pdf17 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf: get bookmarks");
cpdf.startGetBookmarkInfo(pdf17);
var nb = cpdf.numberBookmarks();
console.log("There are %d bookmarks", nb);
for (b2 = 0; b2 < nb; b2++)
{
  var level = cpdf.getBookmarkLevel(b2);
  var page = cpdf.getBookmarkPage(pdf17, b2);
  var text = cpdf.getBookmarkText(b2);
  var open = cpdf.getBookmarkOpenStatus(b2);
  console.log("Bookmark at level %d points to page %d and has text \"%s\" and open %d", level, page, text, open ? 1 : 0);
}
cpdf.endGetBookmarkInfo();
console.log("---cpdf: set bookmarks");
cpdf.startSetBookmarkInfo(1);
cpdf.setBookmarkLevel(0, 0);
cpdf.setBookmarkPage(pdf17, 0, 20);
cpdf.setBookmarkOpenStatus(0, true);
cpdf.setBookmarkText(0, "New bookmark!");
cpdf.endSetBookmarkInfo(pdf17);
cpdf.toFile(pdf17, "testoutputs/06newmarks.pdf", false, false);
console.log("---cpdf_getBookmarksJSON()");
var marksjson = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var marksdata = cpdf.getBookmarksJSON(marksjson);
console.log("Contains %d bytes of data", marksdata.length);
console.log("---cpdf_setBookmarksJSON()");
cpdf.setBookmarksJSON(marksjson, marksdata);
cpdf.toFile(marksjson, "testoutputs/06jsonmarks.pdf", false, false);
console.log("---cpdf_tableOfContents()");
var toc = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
cpdf.tableOfContents(toc, cpdf.timesRoman, 12.0, "Table of Contents", false);
cpdf.toFile(toc, "testoutputs/06toc.pdf", false, false);

// CHAPTER 7. Presentations
// Not included in the library version.
   
// CHAPTER 8. Logos, Watermarks and Stamps
console.log("***** CHAPTER 8. Logos, Watermarks and Stamps");
var textfile = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_addText()");
var all = cpdf.all(textfile);
cpdf.addText(false,
     textfile,
     all,
     "Some Text~~~~~~~~~~!",
     cpdf.topLeft, 20.0, 20.0,
     1.0,
     1,
     cpdf.timesRoman,
     20.0,
     0.5,
     0.5,
     0.5,
     false,
     false,
     true,
     0.5,
     cpdf.leftJustify,
     false,
     false,
     "",
     1.0,
     false);
console.log("---cpdf_addTextSimple()");
cpdf.addTextSimple(textfile, all, "The text!", cpdf.topLeft, 20.0, 20.0, cpdf.timesRoman, 50.0);
cpdf.toFile(textfile, "testoutputs/08added_text.pdf", false, false);
console.log("---cpdf_removeText()");
cpdf.removeText(textfile, all);
cpdf.toFile(textfile, "testoutputs/08removed_text.pdf", false, false);
console.log("---cpdf_textWidth()");
var w = cpdf.textWidth(cpdf.timesRoman, "What is the width of this?");
var stamp = cpdf.fromFile("testinputs/logo.pdf", "");
var stampee = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var stamp_range = cpdf.all(stamp);
console.log("---cpdf_stampOn()");
cpdf.stampOn(stamp, stampee, stamp_range);
console.log("---cpdf_stampUnder()");
cpdf.stampUnder(stamp, stampee, stamp_range);
console.log("---cpdf_stampExtended()");
cpdf.stampExtended(stamp, stampee, stamp_range, true, true, cpdf.topLeft, 20.0, 20.0, true);
cpdf.toFile(stamp, "testoutputs/08stamp_after.pdf", false, false);
cpdf.toFile(stampee, "testoutputs/08stampee_after.pdf", false, false);
var c1 = cpdf.fromFile("testinputs/logo.pdf", "");
var c2 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_combinePages()");
var c3 = cpdf.combinePages(c1, c2);
cpdf.toFile(c3, "testoutputs/08c3after.pdf", false, false);
console.log("---cpdf_stampAsXObject()");
var undoc = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var ulogo = cpdf.fromFile("testinputs/logo.pdf", "");
var undoc_all = cpdf.all(undoc);
var name = cpdf.stampAsXObject(undoc, undoc_all, ulogo);
var content = "q 1 0 0 1 100 100 cm " + name + " Do Q q 1 0 0 1 300 300 cm " + name + " Do Q q 1 0 0 1 500 500 cm " + name + " Do Q";
console.log("---cpdf_addContent()");
cpdf.addContent(content, true, undoc, undoc_all);
cpdf.toFile(undoc, "testoutputs/08demo.pdf", false, false);

// CHAPTER 9. Multipage facilities
console.log("***** CHAPTER 9. Multipage facilities");
var mp = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp2 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp25 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp26 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp3 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp4 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp5 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp6 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var mp7 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_twoUp()");
cpdf.twoUp(mp);
cpdf.toFile(mp, "testoutputs/09mp.pdf", false, false);
console.log("---cpdf_twoUpStack()");
cpdf.twoUpStack(mp2);
cpdf.toFile(mp2, "testoutputs/09mp2.pdf", false, false);
console.log("---cpdf_impose()");
cpdf.impose(mp25, 5.0, 4.0, false, false, false, false, false, 40.0, 20.0, 2.0);
cpdf.toFile(mp25, "testoutputs/09mp25.pdf", false, false);
cpdf.impose(mp26, 2000.0, 1000.0, true, false, false, false, false, 40.0, 20.0, 2.0);
cpdf.toFile(mp26, "testoutputs/09mp26.pdf", false, false);
console.log("---cpdf_padBefore()");
var r = cpdf.range(1, 10);
cpdf.padBefore(mp3, r);
cpdf.toFile(mp3, "testoutputs/09mp3.pdf", false, false);
console.log("---cpdf_padAfter()");
cpdf.padAfter(mp4, r);
cpdf.toFile(mp4, "testoutputs/09mp4.pdf", false, false);
console.log("---cpdf_padEvery()");
cpdf.padEvery(mp5, 5);
cpdf.toFile(mp5, "testoutputs/09mp5.pdf", false, false);
console.log("---cpdf_padMultiple()");
cpdf.padMultiple(mp6, 10);
cpdf.toFile(mp6, "testoutputs/09mp6.pdf", false, false);
console.log("---cpdf_padMultipleBefore()");
cpdf.padMultipleBefore(mp7, 23);
cpdf.toFile(mp7, "testoutputs/09mp7.pdf", false, false);

// CHAPTER 10. Annotations
console.log("***** CHAPTER 10. Annotations");
console.log("---cpdf_annotationsJSON()");
var annot = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var annotjson = cpdf.annotationsJSON(annot);
console.log("Contains %d bytes of data", annotjson.length);

// CHAPTER 11. Document Information and Metadata
console.log("***** CHAPTER 11. Document Information and Metadata");
var pdf30 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var pdf30all = cpdf.all(pdf30);
console.log("---cpdf_getVersion()");
var v = cpdf.getVersion(pdf30);
console.log("minor version:%d", v);
console.log("---cpdf_getMajorVersion()");
var v2 = cpdf.getMajorVersion(pdf30);
console.log("major version:%d", v2);

console.log("---cpdf_getTitle()");
var title = cpdf.getTitle(pdf30);
console.log("title: %s", title);
console.log("---cpdf_getAuthor()");
var author = cpdf.getAuthor(pdf30);
console.log("author: %s", author);
console.log("---cpdf_getSubject()");
var subject = cpdf.getSubject(pdf30);
console.log("subject: %s", subject);
console.log("---cpdf_getKeywords()");
var keywords = cpdf.getKeywords(pdf30);
console.log("keywords: %s", keywords);
console.log("---cpdf_getCreator()");
var creator = cpdf.getCreator(pdf30);
console.log("creator: %s", creator);
console.log("---cpdf_getProducer()");
var producer = cpdf.getProducer(pdf30);
console.log("producer: %s", producer);
console.log("---cpdf_getCreationDate()");
var creationdate = cpdf.getCreationDate(pdf30);
console.log("creationdate: %s", creationdate);
console.log("---cpdf_getModificationDate()");
var modificationdate = cpdf.getModificationDate(pdf30);
console.log("modificationdate: %s", modificationdate);
console.log("---cpdf_getTitleXMP()");
var titlexmp = cpdf.getTitleXMP(pdf30);
console.log("titleXMP: %s", titlexmp);
console.log("---cpdf_getAuthorXMP()");
var authorxmp = cpdf.getAuthorXMP(pdf30);
console.log("authorXMP: %s", authorxmp);
console.log("---cpdf_getSubjectXMP()");
var subjectxmp = cpdf.getSubjectXMP(pdf30);
console.log("subjectXMP: %s", subjectxmp);
console.log("---cpdf_getKeywordsXMP()");
var keywordsxmp = cpdf.getKeywordsXMP(pdf30);
console.log("keywordsXMP: %s", keywordsxmp);
console.log("---cpdf_getCreatorXMP()");
var creatorxmp = cpdf.getCreatorXMP(pdf30);
console.log("creatorXMP: %s", creatorxmp);
console.log("---cpdf_getProducerXMP()");
var producerxmp = cpdf.getProducerXMP(pdf30);
console.log("producerXMP: %s", producerxmp);
console.log("---cpdf_getCreationDateXMP()");
var creationdatexmp = cpdf.getCreationDateXMP(pdf30);
console.log("creationdateXMP: %s", creationdatexmp);
console.log("---cpdf_getModificationDateXMP()");
var modificationdatexmp = cpdf.getModificationDateXMP(pdf30);
console.log("modificationdateXMP: %s", modificationdatexmp);
console.log("---cpdf_setTitle()");
cpdf.setTitle(pdf30, "title");
console.log("---cpdf_setAuthor()");
cpdf.setAuthor(pdf30, "author");
console.log("---cpdf_setSubject()");
cpdf.setSubject(pdf30, "subject");
console.log("---cpdf_setKeywords()");
cpdf.setKeywords(pdf30, "keywords");
console.log("---cpdf_setCreator()");
cpdf.setCreator(pdf30, "creator");
console.log("---cpdf_setProducer()");
cpdf.setProducer(pdf30, "producer");
console.log("---cpdf_setCreationDate()");
cpdf.setCreationDate(pdf30, "now");
console.log("---cpdf_setModificationDate()");
cpdf.setModificationDate(pdf30, "now");
console.log("---cpdf_setTitleXMP()");
cpdf.setTitleXMP(pdf30, "title");
console.log("---cpdf_setAuthorXMP()");
cpdf.setAuthorXMP(pdf30, "author");
console.log("---cpdf_setSubjectXMP()");
cpdf.setSubjectXMP(pdf30, "subject");
console.log("---cpdf_setKeywordsXMP()");
cpdf.setKeywordsXMP(pdf30, "keywords");
console.log("---cpdf_setCreatorXMP()");
cpdf.setCreatorXMP(pdf30, "creator");
console.log("---cpdf_setProducerXMP()");
cpdf.setProducerXMP(pdf30, "producer");
console.log("---cpdf_setCreationDateXMP()");
cpdf.setCreationDateXMP(pdf30, "now");
console.log("---cpdf_setModificationDateXMP()");
cpdf.setModificationDateXMP(pdf30, "now");
cpdf.toFile(pdf30, "testoutputs/11setinfo.pdf", false, false);
var t = [0, 0, 0, 0, 0, 0, 0, 0];
console.log("---cpdf_getDateComponents()");
cpdf.getDateComponents("D:20061108125017Z", t);
console.log("D:20061108125017Z = %d, %d, %d, %d, %d, %d, %d, %d", t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]);
console.log("---cpdf_dateStringOfComponents()");
var datestr = cpdf.dateStringOfComponents(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]);
console.log(datestr);
console.log("---cpdf_getPageRotation()");
var rot = cpdf.getPageRotation(pdf30, 1);
console.log("/Rotate on page 1 = %d", rot);
console.log("---cpdf_hasBox()");
var hasbox = cpdf.hasBox(pdf30, 1, "/CropBox");
console.log("hasbox: %d", hasbox ? 1 : 0);
console.log("---cpdf_getMediaBox()");
var b4 = [0.0, 0.0, 0.0, 0.0];
cpdf.getMediaBox(pdf30, 1, b4);
console.log("Media: %s %s %s %s", b4[0].toFixed(6), b4[1].toFixed(6), b4[2].toFixed(6), b4[3].toFixed(6));
console.log("---cpdf_getCropBox()");
cpdf.getCropBox(pdf30, 1, b4);
console.log("Crop: %s %s %s %s", b4[0].toFixed(6), b4[1].toFixed(6), b4[2].toFixed(6), b4[3].toFixed(6));
console.log("---cpdf_getBleedBox()");
cpdf.getBleedBox(pdf30, 1, b4);
console.log("Bleed: %s %s %s %s", b4[0].toFixed(6), b4[1].toFixed(6), b4[2].toFixed(6), b4[3].toFixed(6));
console.log("---cpdf_getArtBox()");
cpdf.getArtBox(pdf30, 1, b4);
console.log("Art: %s %s %s %s", b4[0].toFixed(6), b4[1].toFixed(6), b4[2].toFixed(6), b4[3].toFixed(6));
console.log("---cpdf_getTrimBox()");
cpdf.getTrimBox(pdf30, 1, b4);
console.log("Trim: %s %s %s %s", b4[0].toFixed(6), b4[1].toFixed(6), b4[2].toFixed(6), b4[3].toFixed(6));
console.log("---cpdf_setMediaBox()");
cpdf.setMediabox(pdf30, pdf30all, 100, 500, 150, 550);
console.log("---cpdf_setCropBox()");
cpdf.setCropBox(pdf30, pdf30all, 100, 500, 150, 550);
console.log("---cpdf_setTrimBox()");
cpdf.setTrimBox(pdf30, pdf30all, 100, 500, 150, 550);
console.log("---cpdf_setArtBox()");
cpdf.setArtBox(pdf30, pdf30all, 100, 500, 150, 550);
console.log("---cpdf_setBleedBox()");
cpdf.setBleedBox(pdf30, pdf30all, 100, 500, 150, 550);
cpdf.toFile(pdf30, "testoutputs/11setboxes.pdf", false, false);
console.log("---cpdf_markTrapped()");
cpdf.markTrapped(pdf30);
console.log("---cpdf_markTrappedXMP()");
cpdf.markTrappedXMP(pdf30);
cpdf.toFile(pdf30, "testoutputs/11trapped.pdf", false, false);
console.log("---cpdf_markUntrapped()");
cpdf.markUntrapped(pdf30);
console.log("---cpdf_markUntrappedXMP()");
cpdf.markUntrappedXMP(pdf30);
cpdf.toFile(pdf30, "testoutputs/11untrapped.pdf", false, false);
console.log("---cpdf_setPageLayout()");
cpdf.setPageLayout(pdf30, cpdf.twoColumnLeft);
console.log("---cpdf_setPageMode()");
cpdf.setPageMode(pdf30, cpdf.useOutlines);
console.log("---cpdf_hideToolbar()");
cpdf.hideToolbar(pdf30, true);
console.log("---cpdf_hideMenubar()");
cpdf.hideMenubar(pdf30, true);
console.log("---cpdf_hideWindowUi()");
cpdf.hideWindowUi(pdf30, true);
console.log("---cpdf_fitWindow()");
cpdf.fitWindow(pdf30, true);
console.log("---cpdf_centerWindow()");
cpdf.centerWindow(pdf30, true);
console.log("---cpdf_displayDocTitle()");
cpdf.displayDocTitle(pdf30, true);
console.log("---cpdf_openAtPage()");
cpdf.openAtPage(pdf30, true, 4);
cpdf.toFile(pdf30, "testoutputs/11open.pdf", false, false);
console.log("---cpdf_setMetadataFromFile()");
cpdf.setMetadataFromFile(pdf30, "testinputs/cpdflibmanual.pdf");
cpdf.toFile(pdf30, "testoutputs/11metadata1.pdf", false, false);
console.log("---cpdf_setMetadataFromByteArray()");
var md = new Uint8Array(9)
md[0] ='B'.charCodeAt();
md[1] = 'Y'.charCodeAt();
md[2] = 'T'.charCodeAt();
md[3] = 'E'.charCodeAt();
md[4] = 'A'.charCodeAt();
md[5] = 'R'.charCodeAt();
md[6] = 'R'.charCodeAt();
md[7] = 'A'.charCodeAt();
md[8] = 'Y'.charCodeAt();
cpdf.setMetadataFromByteArray(pdf30, md);
cpdf.toFile(pdf30, "testoutputs/11metadata2.pdf", false, false);
console.log("---cpdf_getMetadata()");
var metadata = cpdf.getMetadata(pdf30);
console.log("---cpdf_removeMetadata()");
cpdf.removeMetadata(pdf30);
console.log("---cpdf_createMetadata()");
cpdf.createMetadata(pdf30);
cpdf.toFile(pdf30, "testoutputs/11metadata3.pdf", false, false);
console.log("---cpdf_setMetadataDate()");
cpdf.setMetadataDate(pdf30, "now");
cpdf.toFile(pdf30, "testoutputs/11metadata4.pdf", false, false);
console.log("---cpdf_addPageLabels()");
cpdf.addPageLabels(pdf30, cpdf.uppercaseRoman, "PREFIX-", 1, pdf30all, false);
console.log("---cpdf: get page labels");
var pls = cpdf.startGetPageLabels(pdf30);
console.log("There are %d labels", pls);
for (plsc = 0; plsc < pls; plsc++)
{
  var style = cpdf.getPageLabelStyle(plsc);
  var prefix = cpdf.getPageLabelPrefix(plsc);
  var offset = cpdf.getPageLabelOffset(plsc);
  var lab_range = cpdf.getPageLabelRange(plsc);
  console.log("Page label: %d, %s, %d, %d", style, prefix, offset, lab_range);
}
cpdf.endGetPageLabels();
console.log("---cpdf_removePageLabels()");
cpdf.removePageLabels(pdf30);
cpdf.toFile(pdf30, "testoutputs/11pagelabels.pdf", false, false);
console.log("---cpdf_getPageLabelStringForPage()");
var pl = cpdf.getPageLabelStringForPage(pdf30, 1);
console.log("Label string is %s", pl);

// CHAPTER 12. File Attachments
console.log("***** CHAPTER 12. File Attachments");
var attachments = cpdf.fromFile("testinputs/has_attachments.pdf", "");
console.log("---cpdf_attachFile()");
cpdf.attachFile("testinputs/image.pdf", attachments);
console.log("---cpdf_attachFileToPage()");
cpdf.attachFileToPage("testinputs/image.pdf", attachments, 1);
console.log("---cpdf_attachFileFromMemory()");
var empty = new Uint8Array(0);
cpdf.attachFileFromMemory(empty, "metadata.txt", attachments);
console.log("---cpdf_attachFileToPageFromMemory()");
cpdf.attachFileToPageFromMemory(empty, "metadata.txt", attachments, 1);
cpdf.toFile(attachments, "testoutputs/12with_attachments.pdf", false, false);
console.log("---cpdf: get attachments");
cpdf.startGetAttachments(attachments);
var n_a = cpdf.numberGetAttachments();
console.log("There are %d attachments to get", n_a);
for (aa = 0; aa < n_a; aa++)
{
  var a_n = cpdf.getAttachmentName(aa);
  console.log("Attachment %d is named %s", aa, a_n);
  var a_page = cpdf.getAttachmentPage(aa);
  console.log("It is on page %d", a_page);
  var a_data = cpdf.getAttachmentData(aa);
  console.log("Contains %d bytes of data", a_data.length);
}
cpdf.endGetAttachments();
console.log("---cpdf_removeAttachedFiles()");
cpdf.removeAttachedFiles(attachments);
cpdf.toFile(attachments, "testoutputs/12removed_attachments.pdf", false, false);

// CHAPTER 13. Images.
console.log("***** CHAPTER 13. Images");
console.log("---cpdf: get image resolution");
var image_pdf = cpdf.fromFile("testinputs/image.pdf", "");
var im_n = cpdf.startGetImageResolution(image_pdf, 2.0);
for (im = 0; im < im_n; im++)
{
  var im_p = cpdf.getImageResolutionPageNumber(im);
  var im_name = cpdf.getImageResolutionImageName(im);
  var im_xp = cpdf.getImageResolutionXPixels(im);
  var im_yp = cpdf.getImageResolutionYPixels(im);
  var im_xres = cpdf.getImageResolutionXRes(im);
  var im_yres = cpdf.getImageResolutionYRes(im);
  console.log("IMAGE: %d, %s, %d, %d, %s, %s", im_p, im_name, im_xp, im_yp, im_xres.toFixed(6), im_yres.toFixed(6));
}
cpdf.endGetImageResolution();

// CHAPTER 14. Fonts.
console.log("***** CHAPTER 14. Fonts");
console.log("---cpdf: Get Fonts");
var fonts = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var fonts2 = cpdf.fromFile("testinputs/frontmatter.pdf", "");
cpdf.startGetFontInfo(fonts);
var n_fonts = cpdf.numberFonts();
for (ff = 0; ff < n_fonts; ff++)
{
  var page = cpdf.getFontPage(ff);
  var f_name = cpdf.getFontName(ff);
  var type = cpdf.getFontType(ff);
  var encoding = cpdf.getFontEncoding(ff);
  console.log("Page %d, font %s has type %s and encoding %s", page, f_name, type, encoding);
}
cpdf.endGetFontInfo();
console.log("---cpdf_removeFonts()");
cpdf.removeFonts(fonts);
cpdf.toFile(fonts, "testoutputs/14remove_fonts.pdf", false, false);
console.log("---cpdf_copyFont()");
var all = cpdf.all(fonts);
cpdf.copyFont(fonts, fonts2, all, 1, "/Font");

// CHAPTER 15. PDF and JSON
console.log("***** CHAPTER 15. PDF and JSON");
var jsonpdf = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_outputJSON()");
cpdf.outputJSON("testoutputs/15json.json", false, false, false, jsonpdf);
cpdf.outputJSON("testoutputs/15jsonnostream.json", false, true, false, jsonpdf);
cpdf.outputJSON("testoutputs/15jsonparsed.json", true, false, false, jsonpdf);
cpdf.outputJSON("testoutputs/15jsondecomp.json", false, false, true, jsonpdf);
console.log("---cpdf_fromJSON()");
var fromjsonpdf = cpdf.fromJSON("testoutputs/15jsonparsed.json");
cpdf.toFile(fromjsonpdf, "testoutputs/15fromjson.pdf", false, false);
console.log("---cpdf_outputJSONMemory()");
var jbuf = cpdf.outputJSONMemory(false, false, false, fromjsonpdf);
console.log("---cpdf_fromJSONMemory()");
var jfrommem = cpdf.fromJSONMemory(jbuf);
cpdf.toFile(jfrommem, "testoutputs/15fromJSONMemory.pdf", false, false);

// CHAPTER 16. Optional Content Groups
console.log("***** CHAPTER 16. Optional Content Groups");
var ocg = cpdf.fromFile("testinputs/has_ocgs.pdf", "");
console.log("---cpdf: Get OCG List");
var n2 = cpdf.startGetOCGList(ocg);
for(x = 0; x < n2; x++)
{
  console.log(cpdf.ocgListEntry(x));
}
cpdf.endGetOCGList();
console.log("---cpdf_OCGCoalesce()");
cpdf.ocgCoalesce(ocg);
console.log("---cpdf_OCGRename()");
cpdf.ocgRename(ocg, "From", "To");
console.log("---cpdf_OCGOrderAll()");
cpdf.ocgOrderAll(ocg);

// CHAPTER 17. Creating New PDFs
console.log("***** CHAPTER 17. Creating New PDFs");
console.log("---cpdf_blankDocument()");
console.log("---cpdf_blankDocumentPaper()");
var new1 = cpdf.blankDocument(100.0, 200.0, 20);
var new2 = cpdf.blankDocumentPaper(cpdf.a4portrait, 10);
cpdf.toFile(new1, "testoutputs/01blank.pdf", false, false);
cpdf.toFile(new2, "testoutputs/01blanka4.pdf", false, false);
console.log("---cpdf_textToPDF()");
var ttpdf = cpdf.textToPDF(500.0, 600.0, cpdf.timesItalic, 8.0, "../cpdflib-source/cpdflibtest.c");
console.log("---cpdf_textToPDFPaper()");
var ttpdfpaper = cpdf.textToPDFPaper(cpdf.a4portrait, cpdf.timesBoldItalic, 10.0, "../cpdflib-source/cpdflibtest.c");
cpdf.toFile(ttpdf, "testoutputs/01ttpdf.pdf", false, false);
cpdf.toFile(ttpdfpaper, "testoutputs/01ttpdfpaper.pdf", false, false);

// CHAPTER 18. Miscellaneous
console.log("***** CHAPTER 18. Miscellaneous");
var misc = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc2 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc3 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc4 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc5 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc6 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc7 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc8 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc9 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc10 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc11 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc12 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc13 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc14 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc15 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var misc16 = cpdf.fromFile("testinputs/cpdflibmanual.pdf", "");
var all = cpdf.all(misc);
var misclogo = cpdf.fromFile("testinputs/logo.pdf", "")
console.log("---cpdf_draft()");
cpdf.draft(misc, all, true);
cpdf.toFile(misc, "testoutputs/17draft.pdf", false, false);
console.log("---cpdf_removeAllText()");
cpdf.removeAllText(misc2, all);
cpdf.toFile(misc2, "testoutputs/17removealltext.pdf", false, false);
console.log("---cpdf_blackText()");
cpdf.blackText(misc3, all);
cpdf.toFile(misc3, "testoutputs/17blacktext.pdf", false, false);
console.log("---cpdf_blackLines()");
cpdf.blackLines(misc4, all);
cpdf.toFile(misc4, "testoutputs/17blacklines.pdf", false, false);
console.log("---cpdf_blackFills()");
cpdf.blackFills(misc5, all);
cpdf.toFile(misc5, "testoutputs/17blackfills.pdf", false, false);
console.log("---cpdf_thinLines()");
cpdf.thinLines(misc6, all, 2.0);
cpdf.toFile(misc6, "testoutputs/17thinlines.pdf", false, false);
console.log("---cpdf_copyId()");
cpdf.copyId(misclogo, misc7);
cpdf.toFile(misc7, "testoutputs/17copyid.pdf", false, false);
console.log("---cpdf_removeId()");
cpdf.removeId(misc8);
cpdf.toFile(misc8, "testoutputs/17removeid.pdf", false, false);
console.log("---cpdf_setVersion()");
cpdf.setVersion(misc9, 1);
cpdf.toFile(misc9, "testoutputs/17setversion.pdf", false, false);
console.log("---cpdf_setFullVersion()");
cpdf.setFullVersion(misc10, 2, 0);
cpdf.toFile(misc10, "testoutputs/17setfullversion.pdf", false, false);
console.log("---cpdf_removeDictEntry()");
cpdf.removeDictEntry(misc11, "/Producer");
cpdf.toFile(misc11, "testoutputs/17removedictentry.pdf", false, false);
console.log("---cpdf_removeDictEntrySearch()");
cpdf.removeDictEntrySearch(misc13, "/Producer", "1");
cpdf.toFile(misc13, "testoutputs/17removedictentrysearch.pdf", false, false);*/
console.log("---cpdf_replaceDictEntry()");
cpdf.replaceDictEntry(misc14, "/Producer", "\"NewProducer\"");
cpdf.toFile(misc14, "testoutputs/17replacedictentry.pdf", false, false);
console.log("---cpdf_replaceDictEntrySearch()");
cpdf.replaceDictEntrySearch(misc15, "/Producer", "\"NewProducer2\"", "\"pdfTeX-1.40.22\"");
cpdf.toFile(misc15, "testoutputs/17replacedictentrysearch.pdf", false, false);
console.log("---cpdf_getDictEntries()");
var entries = cpdf.getDictEntries(misc16, "/Producer");
console.log("length of entries data = %d", entries.length);
console.log("---cpdf_removeClipping()");
cpdf.removeClipping(misc12, all);
cpdf.toFile(misc12, "testoutputs/17removeclipping.pdf", false, false);
