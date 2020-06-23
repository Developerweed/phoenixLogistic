# Phoenix Logistic
## Introduccion

En esta época que se ha digitalizado cada día más debido a las mejoras tecnológicas y las necesidades del mercado. Se han implementado mayoritariamente, programas y paginas web que ha permitido, otorgar eficiencia y aumentar mayores tasas de ventas a través del mercado digital.

Debido a esto las empresas, se han tenido la obligación y exigencia como una normativa mínima, tener una pagina web. Para poder competir en el E-Commerce que cada vez, es mas esencial para poder mantener vigencia dentro del mercado.

Además, se han creado programas y paginas web, que les han entregado a estas empresas herramientas, para poder facilitar sus funciones y además de poder respaldar su información, de esta forma entregando una mayor seguridad y respaldo en la base de datos de sus clientes.

Nosotros como estudiantes de Full Stack Trainee. Nos hemos enfocado en las necesidades que existen en el mercado, tras analizar e investigar, descubrimos que existe un rubro de alta exigencia en el mercado, dentro del cual, a nuestro parecer, es uno de los que en la actualidad cuenta con mayor déficit de programas y pocas herramientas para los trabajadores. Donde en esta área debiese ser una prioridad mayoritaria debido al rubro que se exponen, nos referimos al “Comercio Exterior” y/o “Comercio Internacional”.


Es por eso que, tras entrevistar estudiantes y profesores del Área, hemos determinado un modelo e ideado una forma de poder apoyar sus labores que hoy en día, es una necesidad critica en ellos.

Debido a esto nuestro proyecto final, lo hemos enfocado en apoyar en sus necesidades y requerimientos mínimos a los profesionales de este rubro, que cumplen una labor muy importante para la economía de Chile y aun así la tecnología, los ha tenido un tanto abandonados en programas y/o paginas para agilizar y facilitar sus labores.



## Muestras de Codigo

Este proyecto fue construido a través del diseño MVC (Modelo, Vista y Controlador) y en su estructura cuenta con los packages .config, .controller, .model.dao, .model.dto, .model.service, en los cuales contienen diferentes lineas de código que cumplen diferentes funciones, según lo que se necesita, como los siguientes:

Este es un ejemplo de uno de los controller de nuestro código, cumpliendo un par de funciones dentro del programa:
@RequestMapping(value="/list")
	public @ResponseBody List<BLDTO> ajaxList(HttpServletRequest req,HttpServletResponse res){
		return blService.list();
	}
@RequestMapping(value="/update")
	public @ResponseBody int ajaxUpdate(HttpServletRequest req,HttpServletResponse res){
		
		int rows=0;
		String requestData;
		try {
			requestData = req.getReader().lines().collect(Collectors.joining());
			Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").serializeNulls().create();
			BLDTO bl =gson.fromJson(requestData, BLDTO.class);
			rows= blService.update(bl);
		} catch (IOException e) {
			e.printStackTrace();	
		}
		
		return rows;
	}
Estos dos codigos cumplen las funciones mapear y mostrar como se genera una lista buscando diferentes datos de nuestra BBDD, y el otro se encarga de Mapear e indicar la funcion de Actualizar datos dentro de la BBDD.
EL siguiente ejemplo se trata de nuestro DAOimpl que esta mostrando como se traen los datos desde la BBDD y se administran segun las funciones que se soliciten como los siguientes:

	public List<BLDTO> list() {	
		List<BLDTO> listbl= jdbcTemplate.query(list, BeanPropertyRowMapper.newInstance(BLDTO.class));
		return listbl;

	}


	public BLDTO get(int Id_bl) {
		Object args[]= {Id_bl};
		BLDTO blDTO;
		try {
			blDTO= jdbcTemplate.queryForObject(select, args, BeanPropertyRowMapper.newInstance(BLDTO.class));
			
		} catch (Exception e) {
			blDTO=null;
			e.printStackTrace();
		}
		return blDTO; 
	}





## Instalacion

Para hacer una correcta instalación asegurese de generar primero que nada la BBDD que fue señalada en un export.sql y tan solo cuando eso este listo, deberas crear un usuario en la tabla users segun tus necesidades y deberás generar una contraseña encriptada en Bcryp  e insertarla en la sección de password de la respectiva tabla.

Deberas modificar el archivo application.properties del proyecto y remplazar los datos ya existentes por los que correspondan en tu equipo ya sea el puerto, username, password, o url. luego de haber hecho esto el programa ya debería estar listo para ser subido en su server.

Se recomienda verificar el documento pom en del proyecto y verificar las dependencias ojdbc y verificar que la direccion requerida sea la correcta(en caso de que este tenga  los rangos (scope) y (systempath) dentro de esa depencia en el archivo pom)

#By DeveloperWeed
