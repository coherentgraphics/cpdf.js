open Js_of_ocaml

exception CPDFError of string

(* Check and raise in case of an error. *)
let checkerror r =
  if Cpdf.getLastError () != 0 then
    begin
      let str = Cpdf.getLastErrorString () in
        Cpdf.clearError ();
        raise (CPDFError str)
    end
  else r

(* Convert Cpdflib range to Javascript array of page numbers *)
let array_of_range r =
  let a = Array.make (Cpdf.lengthrange r) 0 in
    for x = 0 to Cpdf.lengthrange r - 1 do
      a.(x) <- Cpdf.readrange r x
    done;
    Js.array a

(* Convert Javascript array of page numbers to Cpdflib range *)
let range_of_array a =
  let a = Js.to_array a in
  let r = ref (Cpdf.blankrange ()) in
    for x = 0 to Array.length a - 1 do
      let rn = Cpdf.addtorange !r a.(x) in
        Cpdf.deleterange !r;
        r := rn
    done;
    !r

let _ =
  Js.export_all
    (object%js
       (* ENUMERATIONS *)
       val noEdit = 0
       val noPrint = 1
       val noCopy = 2
       val noAnnot = 3
       val noForms = 4
       val noExtract = 5
       val noAssemble = 6
       val noHqPrint = 7
       val pdf40bit = 0
       val pdf128bit = 1
       val aes128bitfalse = 2
       val aes128bittrue = 3
       val aes256bitfalse = 4
       val aes256bittrue = 5
       val aes256bitisofalse = 6
       val aes256bitisotrue = 7
       val a0portrait = 0
       val a1portrait = 1
       val a2portrait = 2
       val a3portrait = 3
       val a4portrait = 4
       val a5portrait = 5
       val a0landscape = 6
       val a1landscape = 7
       val a2landscape = 8
       val a3landscape = 9
       val a4landscape = 10
       val a5landscape = 11
       val usletterportrait = 12
       val usletterlandscape = 13
       val uslegalportrait = 14
       val uslegallandscape = 15
       val posCentre = 0
       val posLeft = 1
       val posRight = 2
       val top = 3
       val topLeft = 4
       val topRight = 5
       val left = 6
       val bottomLeft = 7
       val bottom = 8
       val bottomRight = 9
       val right = 10
       val diagonal = 11
       val reversediagonal = 12
       val timesRoman = 0
       val timesBold = 1
       val timesItalic = 2
       val timesBoldItalic = 3
       val helvetica = 4
       val helveticaBold = 5
       val helveticaOblique = 6
       val helveticaBoldOblique = 7
       val courier = 8
       val courierBold = 9
       val courierOblique = 10
       val courierBoldOblique = 11
       val leftJustify = 0
       val centreJustify = 1
       val rightJustify = 2
       val singlePage = 0
       val oneColumn = 1
       val twoColumnLeft = 2
       val twoColumnRight = 3
       val twoPageLeft = 4
       val twoPageRight = 5
       val useNone = 0
       val useOutlines = 1
       val useThumbs = 2
       val useOC = 3
       val useAttachments = 4
       val decimalArabic = 0
       val uppercaseRoman = 1
       val lowercaseRoman = 2
       val uppercaseLetters = 3
       val lowercaseLetters = 4
       (* CHAPTER 0. Preliminaries *)
       method getLastError =
         Cpdf.getLastError ()
       method getLastErrorString =
         Js.string (Cpdf.getLastErrorString ())
       method clearError =
         Cpdf.clearError ()
       (* CHAPTER 1. Basics *)
       method setFast =
         checkerror (Cpdf.setFast ())
       method setSlow =
         checkerror (Cpdf.setSlow ())
       method version =
         checkerror ((fun () -> Js.string Cpdf.version) ())
       method onexit =
         checkerror (Cpdf.onexit ())
       method startEnumeratePDFs =
         checkerror (Cpdf.startEnumeratePDFs ())
       method enumeratePDFsKey a =
         checkerror (Cpdf.enumeratePDFsKey a)
       method enumeratePDFsInfo a =
         checkerror (Js.string (Cpdf.enumeratePDFsInfo a))
       method endEnumeratePDFs =
         checkerror (Cpdf.endEnumeratePDFs ())
       method deletePdf pdf =
         checkerror (Cpdf.deletePdf pdf)
       method parsePagespec pdf pagespec =
         checkerror (array_of_range (Cpdf.parsePagespec pdf (Js.to_string pagespec)))
       method stringOfPagespec pdf r =
         checkerror (Js.string (Cpdf.stringOfPagespec pdf (range_of_array r)))
       method validatePagespec pagespec =
         checkerror (Cpdf.validatePagespec (Js.to_string pagespec))
       method ptOfCm x =
         checkerror (Cpdf.ptOfCm x)
       method ptOfMm x =
         checkerror (Cpdf.ptOfMm x)
       method ptOfIn x =
         checkerror (Cpdf.ptOfIn x)
       method cmOfPt x =
         checkerror (Cpdf.cmOfPt x)
       method mmOfPt x =
         checkerror (Cpdf.mmOfPt x)
       method inOfPt x =
         checkerror (Cpdf.inOfPt x)
       method range f t =
         checkerror (array_of_range (Cpdf.range f t))
       method blankRange =
         checkerror (array_of_range (Cpdf.blankrange ()))
       method rangeAdd r page =
         checkerror (array_of_range (Cpdf.addtorange (range_of_array r) page))
       method even x =
         checkerror (array_of_range (Cpdf.even (range_of_array x)))
       method odd x =
         checkerror (array_of_range (Cpdf.odd (range_of_array x)))
       method rangeUnion a b =
         checkerror (array_of_range (Cpdf.union (range_of_array a) (range_of_array b)))
       method rangeLength r =
         checkerror (Cpdf.lengthrange (range_of_array r))
       method rangeGet r n =
         checkerror (Cpdf.readrange (range_of_array r) n)
       method difference a b =
         checkerror (array_of_range (Cpdf.difference (range_of_array a) (range_of_array b)))
       method removeDuplicates x =
         checkerror (array_of_range (Cpdf.removeDuplicates (range_of_array x)))
       method isInRange r page =
         checkerror (Cpdf.isInRange (range_of_array r) page)
       method fromFile filename userpw =
         checkerror (Cpdf.fromFile (Js.to_string filename) (Js.to_string userpw))
       method fromFileLazy filename userpw =
         checkerror (Cpdf.fromFileLazy (Js.to_string filename) (Js.to_string userpw))
       method fromMemory data userpw =
         checkerror (Cpdf.fromMemory data (Js.to_string userpw)) (* data *)
       method fromMemoryLazy data userpw =
         checkerror (Cpdf.fromMemoryLazy data (Js.to_string userpw)) (* data *)
       method toFile pdf filename linearize make_id =
         checkerror (Cpdf.toFile pdf (Js.to_string filename) linearize make_id)
       method toFileExt pdf filename linearize make_id preserve_objstm generate_objstm compress_objstm =
         checkerror (Cpdf.toFileExt pdf (Js.to_string filename) linearize make_id preserve_objstm generate_objstm compress_objstm)
       method toFileEncrypted pdf encryption_method permissions ownerpw userpw linearize makeid filename =
         checkerror (Cpdf.toFileEncrypted
           pdf encryption_method (Js.to_array permissions) (Js.to_string ownerpw) (Js.to_string userpw)
           linearize makeid (Js.to_string filename))
       method toFileEncryptedExt
         pdf encryption_method permissions ownerpw userpw linearize makeid preserve_objstm generate_objstm
         compress_objstm filename
       =
         checkerror (Cpdf.toFileEncryptedExt
           pdf encryption_method (Js.to_array permissions) (Js.to_string ownerpw) (Js.to_string userpw)
           linearize makeid preserve_objstm generate_objstm compress_objstm (Js.to_string filename))
       method toMemory pdf linearize make_id =
         checkerror (Cpdf.toFileMemory pdf linearize make_id) (* data *)
       method toMemoryExt pdf linearize make_id preserve_objstm generate_objstm compress_objstm =
         checkerror (Cpdf.toFileMemoryExt pdf linearize make_id preserve_objstm generate_objstm compress_objstm) (* data *)
       method toMemoryEncrypted pdf encryption_method permissions ownerpw userpw linearize makeid =
         checkerror (Cpdf.toFileMemoryEncrypted pdf encryption_method permissions ownerpw userpw linearize makeid) (* data *)
       method toMemoryEncryptedExt pdf encryption_method permissions ownerpw userpw linearize makeid preserve_objstm generate_objstm compress_objstm =
         checkerror (Cpdf.toFileMemoryEncryptedExt pdf encryption_method permissions ownerpw userpw linearize makeid preserve_objstm generate_objstm compress_objstm) (* data *)
       method pages pdf =
         checkerror (Cpdf.pages pdf)
       method pagesFast password filename =
         checkerror (Cpdf.pagesFast (Js.to_string password) (Js.to_string filename))
       method pagesFastMemory password data =
         checkerror (Cpdf.pagesFastMemory (Js.to_string password) data) (* data *)
       method all pdf =
         checkerror (array_of_range (Cpdf.all pdf))
       method isEncrypted pdf =
         checkerror (Cpdf.isEncrypted pdf)
       method decryptPdf pdf userpw =
         checkerror (Cpdf.decryptPdf pdf (Js.to_string userpw))
       method decryptPdfOwner pdf ownerpw =
         checkerror (Cpdf.decryptPdfOwner pdf (Js.to_string ownerpw))
       method hasPermission pdf permission =
         checkerror (Cpdf.hasPermission pdf permission)
       method encryptionKind pdf =
         checkerror (Cpdf.encryptionKind pdf)

       (* CHAPTER 2. Merging and Splitting *)
       method mergeSimple pdfs =
         checkerror (Cpdf.mergeSimple (Js.to_array pdfs))
       method merge pdfs retain_numbering remove_duplicate_fonts =
         checkerror (Cpdf.merge (Js.to_array pdfs) retain_numbering remove_duplicate_fonts)
       method mergeSame pdfs retain_numbering remove_duplicate_fonts ranges =
         checkerror (Cpdf.mergeSame pdfs retain_numbering remove_duplicate_fonts ranges) (* FIXME array of arrays *)
       method selectPages pdf range =
         checkerror (Cpdf.selectPages pdf (range_of_array range))

       (* CHAPTER 3. Pages *)
       method scalePages pdf range sx sy =
         checkerror (Cpdf.scalePages pdf (range_of_array range) sx sy)
       method scaleToFit pdf range sx sy scale =
         checkerror (Cpdf.scaleToFit pdf (range_of_array range) sx sy scale)
       method scaleToFitPaper pdf range papersize s =
         checkerror (Cpdf.scaleToFitPaper pdf (range_of_array range) papersize s)
       method scaleContents pdf range position scale =
         checkerror (Cpdf.scaleContents pdf (range_of_array range) position scale) (* position *)
       method shiftContents pdf range dx dy =
         checkerror (Cpdf.shiftContents pdf (range_of_array range) dx dy)
       method rotate pdf range rotation =
         checkerror (Cpdf.rotate pdf (range_of_array range) rotation)
       method rotateBy pdf range rotation =
         checkerror (Cpdf.rotateBy pdf (range_of_array range) rotation)
       method rotateContents pdf range angle =
         checkerror (Cpdf.rotateContents pdf (range_of_array range) angle)
       method upright pdf =
         checkerror (Cpdf.upright pdf)
       method hFlip pdf =
         checkerror (Cpdf.hFlip pdf)
       method vFlip pdf =
         checkerror (Cpdf.vFlip pdf)
       method crop pdf range x y w h =
         checkerror (Cpdf.crop pdf (range_of_array range) x y w h)
       method setMediabox pdf range minx maxx miny maxy =
         checkerror (Cpdf.setMediabox pdf (range_of_array range) minx maxx miny maxy)
       method setCropBox pdf range minx maxx miny maxy =
         checkerror (Cpdf.setCropBox pdf (range_of_array range) minx maxx miny maxy)
       method setTrimBox pdf range minx maxx miny maxy =
         checkerror (Cpdf.setTrimBox pdf (range_of_array range) minx maxx miny maxy)
       method setArtBox pdf range minx maxx miny maxy =
         checkerror (Cpdf.setArtBox pdf (range_of_array range) minx maxx miny maxy)
       method setBleedBox pdf range minx maxx miny maxy =
         checkerror (Cpdf.setBleedBox pdf (range_of_array range) minx maxx miny maxy)
       method getMediaBox pdf pagenumber =
         checkerror (Js.array (let (a, b, c, d) = Cpdf.getMediaBox pdf pagenumber in [|a; b; c; d|]))
       method getCropBox pdf pagenumber =
         checkerror (Js.array (let (a, b, c, d) = Cpdf.getCropBox pdf pagenumber in [|a; b; c; d|]))
       method getArtBox pdf pagenumber =
         checkerror (Js.array (let (a, b, c, d) = Cpdf.getArtBox pdf pagenumber in [|a; b; c; d|]))
       method getBleedBox pdf pagenumber =
         checkerror (Js.array (let (a, b, c, d) = Cpdf.getBleedBox pdf pagenumber in [|a; b; c; d|]))
       method getTrimBox pdf pagenumber =
         checkerror (Js.array (let (a, b, c, d) = Cpdf.getTrimBox pdf pagenumber in [|a; b; c; d|]))
       method removeCrop pdf range =
         checkerror (Cpdf.removeCrop pdf (range_of_array range))
       method removeArt pdf range =
         checkerror (Cpdf.removeArt pdf (range_of_array range))
       method removeTrim pdf range =
         checkerror (Cpdf.removeTrim pdf (range_of_array range))
       method removeBleed pdf range =
         checkerror (Cpdf.removeBleed pdf (range_of_array range))
       method hardBox pdf range boxname =
         checkerror (Cpdf.hardBox pdf (range_of_array range) (Js.to_string boxname))
       method trimMarks pdf range =
         checkerror (Cpdf.trimMarks pdf (range_of_array range))
       method showBoxes pdf range =
         checkerror (Cpdf.showBoxes pdf (range_of_array range))

       (* CHAPTER 4. Encryption and Decryption *)

       (* CHAPTER 5. Compression *)
       method compress pdf =
         checkerror (Cpdf.compress pdf)
       method decompress pdf =
         checkerror (Cpdf.decompress pdf)
       method squeezeInMemory pdf =
         checkerror (Cpdf.squeezeInMemory pdf)

       (* CHAPTER 6. Bookmarks *)
       method startGetBookmarkInfo pdf =
         checkerror (Cpdf.startGetBookmarkInfo pdf)
       method endGetBookmarkInfo =
         checkerror (Cpdf.endGetBookmarkInfo ())
       method numberBookmarks =
         checkerror (Cpdf.numberBookmarks ())
       method getBookmarkPage pdf n =
         checkerror (Cpdf.getBookmarkPage pdf n)
       method getBookmarkLevel n =
         checkerror (Cpdf.getBookmarkLevel n)
       method getBookmarkText n =
         checkerror (Js.string (Cpdf.getBookmarkText n))
       method getBookmarkOpenStatus n =
         checkerror (Cpdf.getBookmarkOpenStatus n)
       method startSetBookmarkInfo n =
         checkerror (Cpdf.startSetBookmarkInfo n)
       method endSetBookmarkInfo pdf =
         checkerror (Cpdf.endSetBookmarkInfo pdf)
       method setBookmarkPage pdf n page =
         checkerror (Cpdf.setBookmarkPage pdf n page)
       method setBookmarkLevel n level =
         checkerror (Cpdf.setBookmarkLevel n level)
       method setBookmarkText n text =
         checkerror (Cpdf.setBookmarkText n (Js.to_string text))
       method setBookmarkOpenStatus n status =
         checkerror (Cpdf.setBookmarkOpenStatus n status)
       method getBookmarksJSON pdf =
         checkerror (Cpdf.getBookmarksJSON pdf) (* data *)
       method setBookmarksJSON pdf data =
         checkerror (Cpdf.setBookmarksJSON pdf data) (* data *)
       method tableOfContents pdf font fontsize title bookmark =
         checkerror (Cpdf.tableOfContents pdf font fontsize (Js.to_string title) bookmark)

       (* CHAPTER 7. Presentations *)

       (* CHAPTER 8. Logos, Watermarks and Stamps *)
       method stampOn stamp_pdf pdf range =
         checkerror (Cpdf.stampOn stamp_pdf pdf (range_of_array range))
       method stampUnder stamp_pdf pdf range =
         checkerror (Cpdf.stampUnder stamp_pdf pdf (range_of_array range))
       method stampExtended pdf pdf2 range isover scale_stamp_to_fit position relative_to_cropbox =
         checkerror
           (Cpdf.stampExtended pdf pdf2 (range_of_array range) isover scale_stamp_to_fit 1.0 2.0 0 relative_to_cropbox) (* position *)
       method combinePages under over =
         checkerror (Cpdf.combinePages under over)
       method addText
         metrics pdf range text position linespacing bates font fontsize r g b
         underneath relative_to_cropbox outline opacity justification midline
         topline filename linewidth embed_fonts
       =
         checkerror
           (Cpdf.addText metrics pdf (range_of_array range) (Js.to_string text) 0 1.0 2.0
            linespacing bates font fontsize r g b underneath relative_to_cropbox outline
            opacity justification midline topline (Js.to_string filename) linewidth
            embed_fonts) (* position *)
       method addTextSimple pdf range text position font fontsize =
         (* CHECK ME *)
         checkerror
           (Cpdf.addText false pdf (range_of_array range) (Js.to_string text) 0 1.0 2.0 1.0 0 font fontsize 0. 0. 0. false false false 1.0 Cpdfaddtext.LeftJustify false false "" 0.0 false)
       method removeText pdf range =
         checkerror (Cpdf.removeText pdf (range_of_array range))
       method addContent content before pdf range =
         checkerror (Cpdf.addContent (Js.to_string content) before pdf (range_of_array range))
       method stampAsXObject pdf range stamp_pdf =
         checkerror (Js.string (Cpdf.stampAsXObject pdf (range_of_array range) stamp_pdf))
       method textWidth font text =
         checkerror (Cpdf.textWidth font (Js.to_string text))

       (* CHAPTER 9. Multipage facilities *)
       method twoUp pdf =
         checkerror (Cpdf.twoUp pdf)
       method twoUpStack pdf =
         checkerror (Cpdf.twoUpStack pdf)
       method impose pdf x y fit columns rtl btt center margin spacing linewidth =
         checkerror (Cpdf.impose pdf x y fit columns rtl btt center margin spacing linewidth)
       method padBefore pdf range =
         checkerror (Cpdf.padBefore pdf (range_of_array range))
       method padAfter pdf range =
         checkerror (Cpdf.padAfter pdf (range_of_array range))
       method padEvery pdf n =
         checkerror (Cpdf.padEvery pdf n)
       method padMultiple pdf n =
         checkerror (Cpdf.padMultiple pdf n)
       method padMultipleBefore pdf n =
         checkerror (Cpdf.padMultipleBefore pdf n)

       (* CHAPTER 10. Annotations *)
       method annotationsJSON pdf =
         checkerror (Cpdf.annotationsJSON pdf) (* data *)

       (* CHAPTER 11. Document Information and Metadata *)
       method getVersion pdf =
         checkerror (Cpdf.getVersion pdf)
       method getMajorVersion pdf =
         checkerror (Cpdf.getMajorVersion pdf)
       method isLinearized filename =
         checkerror (Cpdf.isLinearized (Js.to_string filename))
       method isLinearizedMemory data =
         checkerror (Cpdf.isLinearizedMemory data) (* data *)
       method getTitle pdf =
         checkerror (Js.string (Cpdf.getTitle pdf))
       method getAuthor pdf =
         checkerror (Js.string (Cpdf.getAuthor pdf))
       method getSubject pdf =
         checkerror (Js.string (Cpdf.getSubject pdf))
       method getKeywords pdf =
         checkerror (Js.string (Cpdf.getKeywords pdf))
       method getCreator pdf =
         checkerror (Js.string (Cpdf.getCreator pdf))
       method getProducer pdf =
         checkerror (Js.string (Cpdf.getProducer pdf))
       method getCreationDate pdf = 
         checkerror (Js.string (Cpdf.getCreationDate pdf))
       method getModificationDate pdf =
         checkerror (Js.string (Cpdf.getModificationDate pdf))
       method getTitleXMP pdf =
         checkerror (Js.string (Cpdf.getTitleXMP pdf))
       method getAuthorXMP pdf =
         checkerror (Js.string (Cpdf.getAuthorXMP pdf))
       method getSubjectXMP pdf =
         checkerror (Js.string (Cpdf.getSubjectXMP pdf))
       method getKeywordsXMP pdf =
         checkerror (Js.string (Cpdf.getKeywordsXMP pdf))
       method getCreatorXMP pdf =
         checkerror (Js.string (Cpdf.getCreatorXMP pdf))
       method getProducerXMP pdf =
         checkerror (Js.string (Cpdf.getProducerXMP pdf))
       method getCreationDateXMP pdf = 
         checkerror (Js.string (Cpdf.getCreationDateXMP pdf))
       method getModificationDateXMP pdf =
         checkerror (Js.string (Cpdf.getModificationDateXMP pdf))
       method getDateComponents s =
         checkerror (Cpdf.getDateComponents (Js.to_string s)) (* array *)
       method dateStringOfComponents y m d h min sec hour_offset minute_offset =
         checkerror (Js.string (Cpdf.dateStringOfComponents y m d h min sec hour_offset minute_offset))
       method setTitle pdf s =
         checkerror (Cpdf.setTitle pdf (Js.to_string s))
       method setAuthor pdf s =
         checkerror (Cpdf.setAuthor pdf (Js.to_string s))
       method setSubject pdf s =
         checkerror (Cpdf.setSubject pdf (Js.to_string s))
       method setKeywords pdf s =
         checkerror (Cpdf.setKeywords pdf (Js.to_string s))
       method setCreator pdf s =
         checkerror (Cpdf.setCreator pdf (Js.to_string s))
       method setProducer pdf s =
         checkerror (Cpdf.setProducer pdf (Js.to_string s))
       method setCreationDate pdf s = 
         checkerror (Cpdf.setCreationDate pdf (Js.to_string s))
       method setModificationDate pdf s =
         checkerror (Cpdf.setModificationDate pdf (Js.to_string s))
       method setTitleXMP pdf s =
         checkerror (Cpdf.setTitleXMP pdf (Js.to_string s))
       method setAuthorXMP pdf s =
         checkerror (Cpdf.setAuthorXMP pdf (Js.to_string s))
       method setSubjectXMP pdf s =
         checkerror (Cpdf.setSubjectXMP pdf (Js.to_string s))
       method setKeywordsXMP pdf s =
         checkerror (Cpdf.setKeywordsXMP pdf (Js.to_string s))
       method setCreatorXMP pdf s =
         checkerror (Cpdf.setCreatorXMP pdf (Js.to_string s))
       method setProducerXMP pdf s =
         checkerror (Cpdf.setProducerXMP pdf (Js.to_string s))
       method setCreationDateXMP pdf s =
         checkerror (Cpdf.setCreationDateXMP pdf (Js.to_string s))
       method setModificationDateXMP pdf s =
         checkerror (Cpdf.setModificationDateXMP pdf (Js.to_string s))
       method markTrapped pdf =
         checkerror (Cpdf.markTrapped pdf)
       method markUntrapped pdf =
         checkerror (Cpdf.markUntrapped pdf)
       method markTrappedXMP pdf =
         checkerror (Cpdf.markTrappedXMP pdf)
       method markUntrappedXMP pdf =
         checkerror (Cpdf.markUntrappedXMP pdf)
       method hasBox pdf page box =
         checkerror (Cpdf.hasBox pdf page (Js.to_string box))
       method getPageRotation pdf page =
         checkerror (Cpdf.getPageRotation pdf page)
       method setPageLayout pdf layout =
         checkerror (Cpdf.setPageLayout pdf layout)
       method setPageMode pdf mode =
         checkerror (Cpdf.setPageMode pdf mode)
       method hideToolbar pdf flag =
         checkerror (Cpdf.hideToolbar pdf flag)
       method hideMenubar pdf flag =
         checkerror (Cpdf.hideMenubar pdf flag)
       method hideWindowUi pdf flag =
         checkerror (Cpdf.hideWindowUi pdf flag)
       method fitWindow pdf flag =
         checkerror (Cpdf.fitWindow pdf flag)
       method centerWindow pdf flag =
         checkerror (Cpdf.centerWindow pdf flag)
       method displayDocTitle pdf flag =
         checkerror (Cpdf.displayDocTitle pdf flag)
       method openAtPage pdf fit pagenumber =
         checkerror (Cpdf.openAtPage pdf fit pagenumber)
       method setMetadataFromFile pdf filename =
         checkerror (Cpdf.setMetadataFromFile pdf (Js.to_string filename))
       method setMetadataFromByteArray pdf data =
         checkerror (Cpdf.setMetadataFromByteArray pdf data) (* data *)
       method getMetadata pdf =
         checkerror (Cpdf.getMetadata pdf) (* data *)
       method removeMetadata pdf =
         checkerror (Cpdf.removeMetadata pdf)
       method createMetadata pdf =
         checkerror (Cpdf.createMetadata pdf)
       method setMetadataDate pdf date =
         checkerror (Cpdf.setMetadataDate pdf (Js.to_string date))
       method addPageLabels pdf style prefix offset range progress =
         checkerror (Cpdf.addPageLabels pdf style (Js.to_string prefix) offset (range_of_array range) progress)
       method removePageLabels pdf = 
         checkerror (Cpdf.removePageLabels pdf)
       method startGetPageLabels pdf =
         checkerror (Cpdf.startGetPageLabels pdf)
       method getPageLabelStyle n =
         checkerror (Cpdf.getPageLabelStyle n)
       method getPageLabelPrefix n =
         checkerror (Js.string (Cpdf.getPageLabelPrefix n))
       method getPageLabelOffset n =
         checkerror (Cpdf.getPageLabelOffset n)
       method getPageLabelRange n =
         checkerror (Cpdf.getPageLabelRange n)
       method endGetPageLabels =
         checkerror (Cpdf.endGetPageLabels ())
       method getPageLabelStringForPage pdf pagenumber =
         checkerror (Js.string (Cpdf.getPageLabelStringForPage pdf pagenumber))

       (* CHAPTER 12. File Attachments *)
       method attachFile filename pdf =
         checkerror (Cpdf.attachFile (Js.to_string filename) pdf)
       method attachFileToPage filename pdf pagenumber =
         checkerror (Cpdf.attachFileToPage (Js.to_string filename) pdf pagenumber)
       method attachFileFromMemory data filename pdf =
         checkerror (Cpdf.attachFileFromMemory data (Js.to_string filename) pdf) (* data *)
       method attachFileToPageFromMemory data filename pdf pagenumber =
         checkerror (Cpdf.attachFileToPageFromMemory data (Js.to_string filename) pdf pagenumber) (* data *)
       method removeAttachedFiles pdf =
         checkerror (Cpdf.removeAttachedFiles pdf)
       method startGetAttachments pdf =
         checkerror (Cpdf.startGetAttachments pdf)
       method endGetAttachments =
         checkerror (Cpdf.endGetAttachments ())
       method numberGetAttachments pdf =
         checkerror (Cpdf.numberGetAttachments ())
       method getAttachmentName n =
         checkerror (Cpdf.getAttachmentName n)
       method getAttachmentPage n =
         checkerror (Cpdf.getAttachmentPage n)
       method getAttachmentData n =
         checkerror (Cpdf.getAttachmentData n) (* data *)

       (* CHAPTER 13. Images *)
       method startGetImageResolution pdf min_required_resolution =
         checkerror (Cpdf.startGetImageResolution pdf min_required_resolution)
       method getImageResolutionPageNumber n =
         checkerror (Cpdf.getImageResolutionPageNumber n)
       method getImageResolutionImageName n =
         checkerror (Js.string (Cpdf.getImageResolutionImageName n))
       method getImageResolutionXPixels n =
         checkerror (Cpdf.getImageResolutionXPixels n)
       method getImageResolutionYPixels n =
         checkerror (Cpdf.getImageResolutionYPixels n)
       method getImageResolutionXRes n =
         checkerror (Cpdf.getImageResolutionXRes n)
       method getImageResolutionYRes n =
         checkerror (Cpdf.getImageResolutionYRes n)
       method endGetImageResolution = checkerror (Cpdf.endGetImageResolution ())

       (* CHAPTER 14. Fonts *)
       method numberFonts =
         checkerror (Cpdf.numberFonts ())
       method getFontPage n =
         checkerror (Cpdf.getFontPage n)
       method getFontName n =
         checkerror (Js.string (Cpdf.getFontName n))
       method getFontType n =
         checkerror (Js.string (Cpdf.getFontType n))
       method getFontEncoding n =
         checkerror (Js.string (Cpdf.getFontEncoding n))
       method startGetFontInfo pdf = 
         checkerror (Cpdf.startGetFontInfo pdf)
       method endGetFontInfo =
         checkerror (Cpdf.endGetFontInfo ())
       method copyFont docfrom docto range pagenumber fontname =
         checkerror (Cpdf.copyFont docfrom docto (range_of_array range) pagenumber (Js.to_string fontname))
       method removeFonts pdf =
         checkerror (Cpdf.removeFonts pdf)

       (* CHAPTER 15. PDF and JSON *)
       method outputJSON filename parse_content no_stream_data decompress_streams pdf =
         checkerror (Cpdf.outputJSON filename parse_content no_stream_data decompress_streams pdf) (* data *)
       method outputJSONMemory parse_content no_stream_data decompress_streams pdf =
         checkerror (Cpdf.outputJSONMemory parse_content no_stream_data decompress_streams pdf) (* data *)
       method fromJSON filename =
         checkerror (Cpdf.fromJSON filename) (* data *)
       method fromJSONMemory data =
         checkerror (Cpdf.fromJSONMemory data) (* data *)

       (* CHAPTER 16. Optional Content Groups *)
       method startGetOCGList pdf =
         checkerror (Cpdf.startGetOCGList pdf)
       method ocgListEntry n =
         checkerror (Js.string (Cpdf.ocgListEntry n))
       method endGetOCGList =
         checkerror (Cpdf.endGetOCGList ())
       method ocgCoalesce pdf =
         checkerror (Cpdf.ocgCoalesce pdf)
       method ocgRename pdf name_from name_to =
         checkerror (Cpdf.ocgRename pdf (Js.to_string name_from) (Js.to_string name_to))
       method ocgOrderAll pdf =
         checkerror (Cpdf.ocgOrderAll pdf)

       (* CHAPTER 17. Creating New PDFs *)
       method blankDocument w h pages =
         checkerror (Cpdf.blankDocument w h pages)
       method blankDocumentPaper papersize pages =
         checkerror (Cpdf.blankDocumentPaper papersize pages)
       method textToPDF w h font fontsize filename =
         checkerror (Cpdf.textToPDF w h font fontsize (Js.to_string filename))
       method textToPDFPaper papersize font fontsize filename =
         checkerror (Cpdf.textToPDFPaper papersize font fontsize (Js.to_string filename))
       method textToPDFMemory w h font fontsize data =
         checkerror (Cpdf.textToPDFMemory w h font fontsize data) (* data *)
       method textToPDFPaperMemory papersize font fontsize data =
         checkerror (Cpdf.textToPDFPaperMemory papersize font fontsize data) (* data *)

       (* CHAPTER 18. Miscellaneous *)
       method draft pdf range boxes =
         checkerror (Cpdf.draft pdf (range_of_array range) boxes)
       method removeAllText pdf range =
         checkerror (Cpdf.removeAllText pdf (range_of_array range))
       method blackText pdf range =
         checkerror (Cpdf.blackText pdf (range_of_array range))
       method blackLines pdf range =
         checkerror (Cpdf.blackLines pdf (range_of_array range))
       method blackFills pdf range =
         checkerror (Cpdf.blackFills pdf (range_of_array range))
       method thinLines pdf range min_thickness =
         checkerror (Cpdf.thinLines pdf (range_of_array range) min_thickness)
       method copyId pdf_from pdf_to =
         checkerror (Cpdf.copyId pdf_from pdf_to)
       method removeId pdf =
         checkerror (Cpdf.removeId pdf)
       method setVersion pdf version =
         checkerror (Cpdf.setVersion pdf version)
       method setFullVersion pdf major minor =
         checkerror (Cpdf.setFullVersion pdf major minor)
       method removeDictEntry pdf key =
         checkerror (Cpdf.removeDictEntry pdf (Js.to_string key))
       method removeDictEntrySearch pdf key searchterm =
         checkerror (Cpdf.removeDictEntrySearch pdf (Js.to_string key) (Js.to_string searchterm))
       method replaceDictEntry pdf key newval =
         checkerror (Cpdf.replaceDictEntry pdf (Js.to_string key) (Js.to_string newval))
       method replaceDictEntrySearch pdf key newval searchterm =
         checkerror (Cpdf.replaceDictEntrySearch pdf key (Js.to_string newval) (Js.to_string searchterm))
       method getDictEntries pdf key =
         checkerror (Cpdf.getDictEntries pdf (Js.to_string key)) (* data *)
       method removeClipping pdf range =
         checkerror (Cpdf.removeClipping pdf (range_of_array range))
    end)
